const { Router } = require('express');
const axios= require('axios');
const { Videogame, Genre, Platform} = require('../db')
const {API_KEY} = process.env
const router = Router();


router.get('/', async (req, res)=> {
    const apiURL3 = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
    const apiPlatf = await apiURL3.data.results.map(el => el.name)
    apiPlatf.forEach( ele => {
        Platform.findOrCreate({
            where : {
                name: ele
            }
        })
    });
    const allPlatf = await Platform.findAll();
    res.status(200).send(allPlatf)
  })
  
  module.exports = router;