const express = require('express');

const routes = express.Router();

//PAGE CONTROLLERS

const voiceController = require('./controllers/page_controllers/pageVoice')


//ROUTES

///////ROUTES AND REQUISITIONS FOR THE AUDIOS TABLE

routes.get('/', voiceController.getPageAudio); // GET cards

module.exports = routes;