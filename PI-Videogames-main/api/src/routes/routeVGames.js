require("dotenv").config();
const { Router } = require('express');
const axios= require('axios');
const { Videogame, Genre, Platform} = require('../db')
const {API_KEY} = process.env

const router = Router();

const createdGame = require("../utils/createdGame")
const getAllVideogames = require("../utils/getAllVideogames");
const findById = require("../utils/findById");
  
  
  
  //------------------------------ ROUTES --------------------------------------------------------\\
  
  router.get('/', async (req,res) =>{
  
    const name = req.query.name // ej: "/videogames?gta"
    let videogamesTotal = await getAllVideogames();
    
    //Si tengo un nombre que me pasan por query
    if(name){
        let videogameName = await videogamesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        videogameName.length ? 
        res.status(200).send(videogameName) :
        res.status(404).send('Video game not found');
    }else{
        res.status(200).send(videogamesTotal)
    }
  })

  //----------------------------------get videogame by id------------------------------------------

router.get('/:id', async (req, res) =>{
    const {id} = req.params;
    const source = isNaN(id) ? "bdd" : "api"
    try{
      const result = await findById(id, source)
      if(result.length == 0) throw Error ("Game not found")
      return res.status(200).send(result)
    } catch (error){
      return res.status(400).json({ error: error.message})
    }
    
  
  })

  //----------------------------------------route to post videogame-------------------------------------
  
   
  router.post('/', async (req, res)=>{
    try{
      const {name, description, released, rating, platform, genre, image} = req.body
      const newGame = await createdGame(name, description, released, rating, platform, genre, image)
      res.send(newGame)
    } catch(error){
        res.status(400).send({message: error.message})
    }
  }) 
  



  module.exports = router;