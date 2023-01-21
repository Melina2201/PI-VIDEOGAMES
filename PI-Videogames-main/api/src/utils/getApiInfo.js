require("dotenv").config();
const axios= require('axios');

const {API_KEY} = process.env


const getApiInfo = async () => {
    const oneHundredGames = [];
  
    for (let i = 1; i <= 5; i++) {
        let api = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
        api.data.results.map(e => {
            oneHundredGames.push( {
                id : e.id,
                name: e.name,
                img: e.background_image,
                genres: e.genres.map(e => e.name).join(', '),
                released: e.released,
                rating: e.rating,
                platform: e.platforms.map((e) => e.platform.name).join(', ')
            })
        })
    }
  
    return oneHundredGames;
  }

  module.exports = getApiInfo