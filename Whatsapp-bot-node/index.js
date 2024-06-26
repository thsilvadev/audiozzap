const qrcode = require("qrcode-terminal");
const { Client, LocalAuth, Buttons } = require("whatsapp-web.js");
const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const https = require('https');
const fs = require('fs');
const eventEmitter  = require("./eventManager");

require(`dotenv`).config();

//Some function definitions

//Time in Amazon Time

function unixToAmazonTime(unixTimestamp) {
  // Convert the Unix timestamp to milliseconds
  const date = new Date(unixTimestamp * 1000);

  // Get the UTC - 4 offset in minutes
  const utcOffset = date.getTimezoneOffset();

  // Adjust the date to UTC-4 time zone
  const amazonDate = new Date(date.getTime() - utcOffset * 60000);

  // Format the date as a string (example format: YYYY-MM-DD HH:mm:ss)
  const formattedDate = amazonDate
    .toISOString()
    .replace("T", " ")
    .substring(0, 19);

  return formattedDate;
}

// Bot initialization

//the puppeteer configuration is to abble it to run on linux root user.
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	}
});

client.on("qr", (qr) => {
  // Generate and scan this code with your phone
  qrcode.generate(qr, { small: true });
  console.log("QR RECEIVED", qr);
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("disconnected", () => {
  console.log("Client is disconnected.")
})

// client.initialize();

// Express initialization

const app = express();
const routes = require("./routes");

app.use(cors());
app.use(express.json()); // Tells express that the response will be in JSON

app.use(routes); // Routing

const port = process.env.PORT;
const ip = process.env.IP;

app.listen(port, ip, () => {
  console.log(`Audiozzap API is on - Running at http://${ip}:${port}/   !!`);
});

//https - SSL

https.createServer({
  cert: fs.readFileSync('./ssl/code.crt'),
  key: fs.readFileSync('./ssl/code.key')
}, app).listen(443, () => console.log("Runnning in https"))

//Whatsapp controllers
const {
  postWhatsappAudio
} = require("./controllers/whatsappControllers/whatsappAudio");
const {getUser} = require("./controllers/whatsappControllers/whatsappUser")

//BOT OPERATION

//Audio receiving

client.on("message", async (msg) => {
  //treat message
  const message = msg;
  message.date = unixToAmazonTime(msg.timestamp);
  console.log(
    "mensagem recebida às: ",
    message.date,
    "id: ",
    message.id,
    "de: ",
    message._data.notifyName,
    "número: ",
    message.from
  );
  console.log(message);
  if (message._data.waveform) {
    if (message._data.duration <= 120) {
      message.reply("Um momento, estamos processando...");
      try {
        //send poll to confirm
        /* const result = await client.sendMessage(message.from, confirmPoll)
                console.log('Buttons sent successfully:', result);

                    // Log the button details
                    console.log('Button details:', confirmPoll.buttons); */

        const audioData = await msg.downloadMedia();

        const phoneNumber = message.from.slice(0, -5);
        console.log('phone number: ', phoneNumber);

        const isUserRegistered = await getUser(phoneNumber);
        console.log('is user registered? ', isUserRegistered);

        if (isUserRegistered) {
          await message.reply(`Tudo certo, estamos subindo seu áudio ao ar...`);
          const postAudio = await postWhatsappAudio(message, audioData);

          if (postAudio){
            message.reply("Pronto! Aqui está seu áudio: ");
            message.reply(`https://www.audiozzap.com/${postAudio}`);
          } else {
            message.reply('estamos em manutenção técnica :/ tente novamente mais tarde.')
          }
        } else {
          // Hash the user's password using bcrypt
          const userHash = jwt.sign(
            {
              phoneNumber: phoneNumber,
            },
            process.env.USERHASH_TOKEN_TAG
          );
          console.log(userHash);
          // Encode Hash in URI to use in URL:
          const encodedURIHash = encodeURIComponent(userHash);

          await message.reply(
            `Quase lá, clique no link abaixo para terminar o seu registro rapidinho: `
          );
          message.reply(
            `${process.env.FRONTEND_URL}/userRegistration/${encodedURIHash}`
          );
          eventEmitter.on("userPosted", async (userId) => {
            message.reply('Perfeito! Estamos subindo seu áudio ao ar...')
            const postAudio = await postWhatsappAudio(message, audioData);
          })
            eventEmitter.on("originalAudioPosted", (audioId) => {
              message.reply("Tudo pronto! Aqui está seu áudio: ");
              message.reply(`https://www.audiozzap.com/${audioId}`);
            });

          
       
          
        }
      } catch (err) {
        console.log(err);
      }
    }
  } else {
    message.reply(
      "Opa! Audiozzap na escuta! Estamos em fase de testes e por hora só estamos recebendo audios. Experimente nos enviar um!"
    );
  }
});
