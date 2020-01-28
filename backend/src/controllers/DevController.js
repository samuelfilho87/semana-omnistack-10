const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

// index, show, store, update, destroy
module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    const { githubUserName, techs, latitude, longitude } = request.body;
    
    let dev = await Dev.findOne({githubUserName});
    
    if(!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${githubUserName}`);
      
      const {name = login, avatar_url, bio} = apiResponse.data;
      
      const techArray = parseStringAsArray(techs);
      
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    
      dev = await Dev.create({
        githubUserName,
        name,
        avatarURL: avatar_url,
        bio,
        techs: techArray,
        location
      });

      // Filtrar as conexões que estão há no máximo 10km de distância
      // e que o novo dev tenha pelo menos uma das tecnologias filtradas
      const sendSocketMessageTo = findConnections(
        {latitude, longitude},
        techArray
      );

      sendMessage(sendSocketMessageTo, 'newDev', dev);
    }
  
    return response.json(dev);
  }
};