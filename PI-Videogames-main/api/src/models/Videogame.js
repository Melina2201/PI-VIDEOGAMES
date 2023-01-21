const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: { 
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    released:{ 
      type: DataTypes.STRING,
    },
    rating:{
      type: DataTypes.FLOAT
    },
    image: {
      type: DataTypes.STRING
    },
    platform: {
      type: DataTypes.STRING,
      allowNull:false
    }
  },{timestamps : false});
};
