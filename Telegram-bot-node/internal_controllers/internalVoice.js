const https = require("https");
const fs = require("fs");
const path = require("path");

const db = require("../db");
const knex = require("knex")(db["development"]);

module.exports = {
  async postTelegramAudio(messageObject) {
    //Post in DB
    try {
      await knex("audios").insert({
        telegram_message_id: messageObject.message_id,
        duration: messageObject.voice.duration,
        language: messageObject.from.language_code,
        mime_type: messageObject.voice.mime_type,
        file_size: messageObject.voice.file_size,
        file_id: messageObject.voice.file_id,
        file_unique_id: messageObject.voice.file_unique_id,
        user_telegram_id: messageObject.from.id,
      });
      console.log("post sucessful");
    } catch (error) {
      console.error(`ERROR: `, error);
    }
  },

  async downloadTelegramAudio(downloadUrl, messageObject) {
    //Download and store audio
    const outputFileName = `${messageObject.message_id}${downloadUrl.slice(
      -4
    )}`;

    const rawFolderPath =
      "c:\\Users\\thiago\\Documents\\THSILVADEV\\Audiozzap\\Projeto\\downloads";
    const outputPath = path.join(rawFolderPath, outputFileName);
    const file = fs.createWriteStream(outputPath);
    try {
      https.get(downloadUrl, (response) => {
        response.pipe(file);

        file.on("finish", () => {
          file.close(() => {
            console.log("Download completed.");
          });
        });
      });
    } catch (error) {
      fs.unlink(outputPath, () => {}); // Delete the file async if error
      console.error(`Error downloading the file: ${err.message}`);
    }
  },
};
