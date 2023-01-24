require("dotenv").config();

const { Videogame, Genre, Platform} = require('../db');

const getAllVideogames = require("../utils/getAllVideogames");



const findByIdAPI = async (id) => {
    const allGames = await getAllVideogames();
    const result = allGames.filter((game)=>game.id == id)
    return result
}

const findByIdBDD = async (id) => {
    const result = await Videogame.findAll({ where: {id}})
    return result
}

const findById = async (id, source) => {
    const result = source == "api" ? await findByIdAPI(id) : await findByIdBDD(id)
    return result
}

module.exports = findById