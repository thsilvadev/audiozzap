const db = require("../../db");
const knex = require("knex")(db["development"]);
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const eventEmitter  = require("../../eventManager");


console.log('pageUser logging eventEmitter: ', eventEmitter)

module.exports = {
  async postUser(req, res) {
    const { encodedURIHash } = req.params;
    const { password, username } = req.body;
    console.log(password);

    //decode hash:
    const userHash = decodeURIComponent(encodedURIHash);
    console.log(userHash);
    try {
      const data = jwt.verify(userHash, process.env.USERHASH_TOKEN_TAG);
      if (!data.phoneNumber) {
        return res.sendStatus(401);
      } else {
        const phoneNumber = data.phoneNumber;
        const hashedPassword = await bcryptjs.hash(password, saltRounds);
        const result = await knex("users").insert({
          phone_number: phoneNumber,
          password: hashedPassword,
          username: username
        });
        console.log("user ", phoneNumber, "registered!");

        //4. Feedback User
        console.log("result: ", result);
        eventEmitter.emit("userPosted", result);

        return res.status(200).json({
          message: "user successfully registered",
        });
      }
    } catch (error) {
      console.error("JWT verification error:", error);
      return res
        .status(401)
        .json({ message: "Sorry. Something went wrong :/", error });
    }
  },
};
