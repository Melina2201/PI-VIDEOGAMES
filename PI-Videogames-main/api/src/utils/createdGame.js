require("dotenv").config();
const axios= require('axios');
const { Videogame, Genre, Platform} = require('../db')


const createdGame = async (name, description, released, rating, platform, genre) => {
    const gameExist = await Videogame.findOne({ where: {name} });
    if(gameExist){
      throw new Error(`Game ${name} already exists`)
    }
    const game = await Videogame.create({
      name,
      description,
      released,
      rating,
      platform
    })
    const genderInDb = await Genre.findAll({
      where: {name: genre}
    }) 

    game.addGenre(genderInDb)
    return "Successfully created game"
  }

  module.exports = createdGame