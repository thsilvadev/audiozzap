const db = require("../../db");
const knex = require("knex")(db["development"]);

module.exports = {
  async getPageAudio(req, res) {
    try {
      const result = await knex("Audios")
      return res.json(result)
    } catch (err) {
        console.error('error', err)
        return res.status(500).json({error: 'error.'})
    }
  },
};
