const express = require('express');

const routes = express.Router();

//PAGE CONTROLLERS

const voiceController = require('./controllers/pageControllers/pageAudio')
const userController = require("./controllers/pageControllers/pageUser")

//ROUTES

///////ROUTES AND REQUISITIONS FOR THE AUDIOS TABLE

routes.get('/', voiceController.getAudios); // GET cards
routes.get('/:userId', voiceController.getUserAudios)
routes.get('/audio/:file_unique_id', voiceController.getAudio)

//////ROUTES AND REQUISITIONS FOR THE USERS TABLE

routes.post('/userRegistration/:userHash', userController.postUser)



module.exports = routes;