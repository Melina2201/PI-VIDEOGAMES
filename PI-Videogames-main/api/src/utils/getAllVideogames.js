require("dotenv").config();
const axios= require('axios');


const getApiInfo = require("../utils/getApiInfo")
const getInfoDB = require("../utils/getInfoDB")

// Function to get videosgames from api and db
const getAllVideogames = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getInfoDB();
    const infoTotal = dbInfo.concat(apiInfo);
    return infoTotal;
  }

  module.exports = getAllVideogames