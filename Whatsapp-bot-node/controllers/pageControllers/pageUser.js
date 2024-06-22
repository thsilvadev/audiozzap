const db = require("../../db");
const knex = require("knex")(db["development"]);
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const { postWhatsappAudio } = require("../whatsappControllers/whatsappAudio")

module.exports = {
  async postUser(req, res) {
    const { userHash } = req.params;
    const { password } = req.body;
    try {
      const data = jwt.verify(userHash, process.env.USERHASH_TOKEN_TAG);
      if (!data.phoneNumber) {
        return res.sendStatus(401);
      } else {
        const phoneNumber = data.phoneNumber
        const hashedPassword = await bcryptjs.hash(password, saltRounds);
        const result = await knex("users").insert({
          phone_number: phoneNumber,
          password: hashedPassword,
        });
        console.log("user ", phoneNumber, "registered!");
        //post original audio caught before user registering itself.
        if (data.message && data.audioData){
          await postWhatsappAudio(data.message, data.audioData);
        }
        res.status(200).json({
          message: "user successfully registered",
        });
      }
    } catch (error) {
      console.error("JWT verification error:", error);
      return res.status(401).json({ error: "Sorry. Something went wrong :/" });
    }
  },
};
