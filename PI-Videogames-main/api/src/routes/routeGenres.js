require("dotenv").config();
const { Router } = require('express');
const axios= require('axios');
const { Videogame, Genre, Platform} = require('../db')
const {API_KEY} = process.env
const router = Router();
const getAllGenres = require("../utils/getAllGenres")


//Route to get genders and save in my db


router.get('/', async (req, res) => {
  const results = await getAllGenres()
  res.status(200).send(results)
})
 
 
  
  
  module.exports = router;