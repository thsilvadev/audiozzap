require(`dotenv`).config();

const db = require("../../db");
const knex = require("knex")(db["development"]);

module.exports = {
    async getUser (phoneNumber) {
        const isUserRegistered = await knex('users').where('phone_number', phoneNumber)
        return isUserRegistered.length
    }
}