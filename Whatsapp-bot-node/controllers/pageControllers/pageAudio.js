const db = require("../../db");
const knex = require("knex")(db["development"]);

module.exports = {
  async getAudios(req, res) {
    try {
      const result = await knex("audios");
	    console.log(`ip ${req.ip} successfully got audios`);
      return res.json(result);
    } catch (err) {
      console.error("error", err);
      return res.status(500).json({ error: "error." });
    }
  },

  async getAudio(req, res) {
    const { params } = req;
    const fileId = params.id;
    console.log(fileId);
    try {
      const result = await knex("audios").where("id", fileId);
      console.log(`ip ${req.ip} succesfully got audio of id ${params.id} ` )
      console.log('result: ', result)
      return res.status(200).json(result);
      
    } catch (err) {
      console.log("error", err);
      return res.status(500).json({ error: err });
    }
  },

  async logAudio (req, res) {
    const {message, error} = req.body;
    if (message) {
      console.log('message: ', message)

    }
    if (error) {
      console.log('error: ', error)
    }
  },

  async getUserAudios(req, res) {},
};
