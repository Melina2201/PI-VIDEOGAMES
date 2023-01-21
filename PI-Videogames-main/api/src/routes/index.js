const { Router } = require('express');

//--------------------------------------------------------------


const routeVGames = require("./routeVGames");
const routeGenres = require("./routeGenres");
const routePlatforms = require('./routePlataforms');


//--------------------------------------------------------------

const router = Router();

//--------------------------------------------------------------


router.use('/videogames', routeVGames);
router.use('/genres', routeGenres);
router.use('/platforms', routePlatforms); 

//--------------------------------------------------------------

module.exports = router;
