const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");
require(`dotenv`).config();

//Bot stuff

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, { polling: true });

console.log("Audiozzap BOT online");

//Express stuff

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

//Internal operations
const {
  postTelegramAudio,
  downloadTelegramAudio,
} = require("./internal_controllers/internalVoice");

// FUNCTIONS FIRST

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

//Download Audio File

let filePath = "";
const downloadUrl = `https://api.telegram.org/file/bot${token}`;

async function getAudioFile(message) {
  try {
    const response = await bot.getFile(message.voice.file_id);
    console.log("audio data: ", response);
    console.log("file_path: ", response.file_path);
    filePath = response.file_path;
    const updatedDownloadUrl = `${downloadUrl}/${filePath}`;
    console.log(updatedDownloadUrl);
    return updatedDownloadUrl;
  } catch (error) {
    console.error("Error fetching file:", error);
    throw error;
  }
}

//Upon receiving message
bot.on("message", async (msg) => {
  //treat message
  const message = msg;
  message.date = unixToAmazonTime(msg.date);

  console.log(message, "mensagem recebida");
  //If is a voice message
  if (message.voice) {
    if (message.voice.duration <= 120){
      try {
        postTelegramAudio(message);
        const downloadUrl = await getAudioFile(message);
  
        await downloadTelegramAudio(downloadUrl, message);
      } catch (error) {
        console.error("Error processing voice message:", error);
      }
    } else {
      bot.sendMessage(message.chat.id, 'Mais pra frente aceitaremos podcasts... mas por hora, envie um áudio de até 2 minutos.')
    }
    
  } else {
    bot.sendMessage(message.chat.id, 'Só estamos aceitando áudio por enquanto')
  }
});
