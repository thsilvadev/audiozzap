const express = require('express');

const routes = express.Router();

//PAGE CONTROLLERS

const voiceController = require('./controllers/pageControllers/pageAudio')


//ROUTES

///////ROUTES AND REQUISITIONS FOR THE AUDIOS TABLE

routes.get('/', voiceController.getAudios); // GET cards
routes.get('/:userId', voiceController.getUserAudios)
routes.get('/audio/:file_unique_id', voiceController.getAudio)

module.exports = routes;