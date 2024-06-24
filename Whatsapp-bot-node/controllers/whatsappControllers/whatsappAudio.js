const https = require("https");
const fs = require("fs");
const path = require("path");
require(`dotenv`).config();
const db = require("../../db");
const knex = require("knex")(db["development"]);
const eventEmitter  = require("../../eventManager");
//transcription imports

const FormData = require("form-data");
const axios = require("axios");
const apiKey = process.env.OPEN_AI_KEY;
const openai = require("openai");
// const whisper = require("whisper-node")
const ffmpeg = require('fluent-ffmpeg');


module.exports = {
  async postWhatsappAudio(message, audioData) {

    try {
//1. Download audio to local machine

    // Specify the directory where files will be saved
    const outputDirectory = "./output/";

    // Ensure the output directory exists; if not, create it
    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory);
    }

    // Build the full file path
    const oggFilePath = `${path.join(outputDirectory, message.id.id)}.ogg`;

    fs.writeFileSync(`${oggFilePath}`, Buffer.from(audioData.data, "base64"));
    console.log(`File '${oggFilePath}' has been created successfully.`);
    //2. Transcribe it into text

    // const audioTranscription = async (oggFilePath, apiKey) => {

    //   const formData = new FormData();
    //   formData.append("model", "whisper-1")
    //   formData.append("file", fs.createReadStream(oggFilePath))

    //   const transcript = await axios.post("https://api.openai.com/v1/audio/transcriptions", formData, {
    //     headers:  {
    //       authorization: `Bearer ${apiKey}`,
    //       "Content-Type": "multipart/form-data"
    //     }
    //   }).then((response) => {
    //     return transcript
    //   })

      // const openAiClient = new openai.OpenAI({ apiKey, timeout: 10000 });
      // const maxRetries = 3;
      // let attempts = 0;
  
      // while (attempts < maxRetries) {
      //   try {
      //     const transcript = await openAiClient.audio.transcriptions.create({
      //       file: fs.createReadStream(`${oggFilePath}`),
      //       model: "whisper-1",
      //     });
      //     console.log(transcript);
      //     return transcript
      //   } catch (error) {
      //     attempts++;
      //     if (attempts >= maxRetries) {
      //       throw error;
      //     }
      //     console.log(`Tentativa ${attempts} falhou. Tentando novamente...`);
      //   }
      // }
    // }
    
    // const transcription = await audioTranscription(oggFilePath, apiKey)

    // Convert OGG to WAV
  // const wavFilePath = path.join(outputDirectory, `${messageId}.wav`);

 // ffmpeg(oggFilePath)
   // .toFormat('wav')
   // .on('end', () => {
     // console.log(`File '${wavFilePath}' has been created successfully.`);
      // Optionally delete the OGG file
   // })
   // .on('error', (err) => {
    //  console.error(`An error occurred: ${err.message}`);
  //  })
//    .save(wavFilePath);

  //   const transcription = whisper(wavFilePath)
  //   console.log(transcription)

    //3. Post in DB

    const result = await knex("audios").insert({
      wpp_message_id: message.id.id,
      duration: message.duration,
      created_at: message.date,
      mime_type: audioData.mimetype,
      file_size: audioData.filesize,
      user_wpp_id: message.from,
      audio_data: audioData.data,
      transcription: null,
    });

    //4. Feedback User
    eventEmitter.emit('originalAudioPosted', result)

    return result;
    } catch (error) {
      console.log(error)
    }
    
  },
};
