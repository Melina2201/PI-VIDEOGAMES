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
      allowNull: false
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
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    createDB: {  //sirve para distinguir entre videojuegos de la api y bd
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  },{timestamps : false});
};
