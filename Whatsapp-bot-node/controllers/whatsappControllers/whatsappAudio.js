const https = require("https");
const fs = require("fs");
const path = require("path");
require(`dotenv`).config();

const db = require("../../db");
const knex = require("knex")(db["development"]);

module.exports = {
  async postWhatsappAudio(message, audioData) {
    //1. Download and store audio to local path

    // Specify the directory where files will be saved
    const outputDirectory = "./output/";

    // Ensure the output directory exists; if not, create it
    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory);
    }

    // Build the full file path
    const filePath = path.join(outputDirectory, message.id.id);

    fs.writeFileSync(
      `${filePath}.ogg`,
      Buffer.from(audioData.data, "base64")
    );
    console.log(`File '${filePath}' has been created successfully.`)
  },
};
