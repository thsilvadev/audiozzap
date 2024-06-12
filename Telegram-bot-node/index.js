const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");
require(`dotenv`).config();

//Bot stuff

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, {
  polling: {
    params: {
      allowed_updates: ["message", "poll_answer"]
    }
  }
});

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
} = require("./controllers/telegram_controllers/telegramVoice");

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
    filePath = response.file_path;
    console.log("file_path: ", filePath);
    const updatedDownloadUrl = `${downloadUrl}/${filePath}`;
    console.log("updated file_path: ", updatedDownloadUrl);
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

  console.log(`mensagem recebida às: ${message.date}`, message);
  //If is a voice message
  if (message.voice) {
    if (message.voice.duration <= 120) {
      bot.sendMessage(message.chat.id, "processando...");
      bot
        .sendPoll(
          message.chat.id,
          "Opa, Já tá subindo ao ar! Confirma a postagem?",
          ["Posta!", "Calma"]
        )
        .then((poll) => {
          console.log("poll sent: ", poll);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      bot.sendMessage(
        message.chat.id,
        "Mais pra frente aceitaremos podcasts... mas por hora, envie um áudio de até 2 minutos."
      );
    }
  } else {
    bot.sendMessage(message.chat.id, "Só estamos aceitando áudio por enquanto");
  }

  
});

bot.on("poll_answer", async (option) => {
  console.log('poll_answer event triggered');
  console.log("option received:", option);

  if (option) {
    console.log("option details:", option);
  } else {
    console.log("opção não escolhida");
  }
});

// Log any polling errors
bot.on("polling_error", (error) => {
  console.log("Polling error:", error);
});

// Log all updates to inspect incoming data
bot.on("update", (update) => {
  console.log("Update received:", update);
});

// Log all event types for further inspection
bot.on('callback_query', (query) => {
  console.log('callback_query event triggered', query);
});

bot.on('polling_error', (error) => console.log(error));
bot.on('webhook_error', (error) => console.log(error));
bot.on('error', (error) => console.log(error));

