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
      console.log(`ip ${req.ip} succesfully got audios from user of id ${params.id} ` )
      return res.status(200).json(result);
      
    } catch (err) {
      console.log("error", err);
      return res.status(500).json({ error: err });
    }
  },

  async getUserAudios(req, res) {},
};
