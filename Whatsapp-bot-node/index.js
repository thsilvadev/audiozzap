const qrcode = require('qrcode-terminal')
const { Client, LocalAuth, Buttons } = require('whatsapp-web.js');
const express = require("express")
const cors = require("cors");
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

const client = new Client(
    {
        authStrategy: new LocalAuth()
    }
);

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, { small: true })
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

// Express initialization

const app = express();
const routes = require("./routes");

app.use(cors());
app.use(express.json()); // Tells express that the response will be in JSON

app.use(routes); // Routing

const port = 8080;
const ip = "127.0.0.1";

app.listen(port, ip, () => {
  console.log(`Audiozzap API is on - Running at http://${ip}:${port}/   !!`);
});

//Whatsapp controllers
const  {
    postWhatsappAudio 
} = require("./controllers/whatsappControllers/whatsappAudio")



//BOT OPERATION

//Audio receiving
const confirmPoll = new Buttons('Estamos subindo seu audio ao ar (público), confirma?', [{body: 'Sim'}, {body: 'Não'}], null, null)

client.on('message', async msg => {
    //treat message
  const message = msg;
  message.date = unixToAmazonTime(msg.timestamp);
    console.log('mensagem recebida às: ', message.date, "id: ", message.id, "de: ", message._data.notifyName)
    if (message._data.waveform) {
        if (message._data.duration <= 120){
            message.reply('processando...')
            try {
                //send poll to confirm
                /* const result = await client.sendMessage(message.from, confirmPoll)
                console.log('Buttons sent successfully:', result);

                    // Log the button details
                    console.log('Button details:', confirmPoll.buttons); */

                //download media
                const audioData = await msg.downloadMedia();
                console.log(audioData)
                postWhatsappAudio(message, audioData)
            } catch (err){
                console.log(err)
            }
            

        }
    } else {
        message.reply('por enquanto só estamos recebendo áudios. Experimente nos enviar um!')
    }
});