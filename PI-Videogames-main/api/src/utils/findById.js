require("dotenv").config();

const { Videogame, Genre, Platform} = require('../db');

const getAllVideogames = require("../utils/getAllVideogames");

const {API_KEY} = process.env

const axios = require("axios")


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
    let result;
    if (source == "api") {
        result = await findByIdAPI(id);
        if(result.length > 0){
            const detalle = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            const description = detalle.data.description_raw;
            result[0]['description'] = description;
        }
    } else {
        result = await findByIdBDD(id);
    }
    return result;
}

module.exports = findById