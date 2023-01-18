const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios= require('axios');
const { Videogame, Genres} = require('../db')
const {API_KEY} = process.env

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//funciones
const getApiInfo = async () => {
    let gamesArr = [];
    let urlApi = `https://api.rawg.io/api/games?key=${API_KEY}`;
    try {
      for (let i = 0; i < 5; i++) { //me traeo 20 por pagina yp ara traer 100 tengo que pegarle 5 veces
        const urlData = await axios.get(urlApi); 
        urlData.data.results 
        .map((e) => {         
            gamesArr.push({
              id: e.id,
              name: e.name,
              description: e.description_raw,
              image: e.background_image,
              released: e.released,
              rating: e.rating,
             // platforms: e.platforms.map((e) => e.platform.name),
              genres: e.genres.map((e) => e.name),
            });
          });
        urlApi = urlData.data.next; //me manda a la otra pagina donde estan los otros 20 juegos
      }
      return gamesArr; 
    } catch (error) {
      console.log("Couldnt bring info from API", error); 
    }
  }
  
  //traigo de la database
  const getDbInfo = async () => {
    //traigo todos los juegos que hay en mi db con su relacion generos
    const GamesdB = await Videogame.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  //map solo para usar las propiedades que son necesarias
    const newGamedB = await GamesdB.map((e) => {
      return {
        id: e.id,
        name: e.name,
        description:e.description_raw,
        image: e.image,
        released: e.released,
        rating: e.rating,
        platforms: e.platforms,
        genres: e.genres.map((el) => el.name),
        inDb: e.inDb,
      };
    });
    return newGamedB;
  };
  const getAllVideogames = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = dbInfo.concat(apiInfo);
    return infoTotal;
  };
  router.get("/videogames", async (req, res) => {
    const { name } = req.query;
    const allVideogame = await getAllVideogames(); //creo por fuera la const para llamarla si no me pasan name en el else abajo de todo
    if (name) {
      const videogameName = await allVideogame.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      return videogameName
        ? res.status(200).send(videogameName)
        : res.status(404).send("The videogame was not found =(");
    }else{
    return res.status(200).json(allVideogame);
  }});

module.exports = router;
