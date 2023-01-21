require("dotenv").config();
const { Router } = require('express');
const axios= require('axios');
const { Videogame, Genre, Platform} = require('../db')
const {API_KEY} = process.env

const router = Router();

const createdGame = require("../utils/createdGame")
const getAllVideogames = require("../utils/getAllVideogames")
  
  
  
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

  //----------------------------------get videogame detail by id------------------------------------------

router.get('/:id', async (req, res) =>{
    const {id} = req.params;
    try{
  if(!id.includes('-')){
        let allVideogames = await getAllVideogames(); // me trae todo
    
        let idGame = await allVideogames.filter(e => e.id === parseInt(id));
    
        if(idGame.length > 0){
            const detalle = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            const description = detalle.data.description_raw;
            idGame[0]['description'] = description;
            res.status(200).send(idGame)
        }
    }else {
        let gameFound = await Videogame.findByPk(id, {
            include: [{
                model: Genre,
                attributes: ['name'],
                through : {
                    attributes: [],
                }
            }]
        })
        var arreglo = []
        arreglo.push(gameFound)
  
        res.status(200).json(arreglo)
    }
    }catch(error){
        res.status(404).send(error)
    }
    
  
  })

  //----------------------------------------route to post videogame-------------------------------------
  
   
  router.post('/', async (req, res)=>{
    try{
      const {name, description, released, rating, platform, genre} = req.body
      const newGame = await createdGame(name, description, released, rating, platform, genre)
      res.send(newGame)
    } catch(error){
        res.status(400).send({message: error.message})
    }
  }) 
  



  module.exports = router;