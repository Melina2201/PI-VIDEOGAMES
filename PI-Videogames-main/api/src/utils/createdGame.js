require("dotenv").config();
const axios= require('axios');
const { Videogame, Genre, Platform} = require('../db')


const createdGame = async (name, description, released, rating, platform, genre, image) => {
    const gameExist = await Videogame.findOne({ where: {name} });
    if(gameExist){
      throw new Error(`Game ${name} already exists`)
    }
    const game = await Videogame.create({
      name,
      description,
      released,
      rating,
      platform,
      genre,
      image
    })

    return "Successfully created game"
  }

  module.exports = createdGame