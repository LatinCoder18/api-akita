'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Negocio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  };

  Negocio.init({
    id: {type: DataTypes.INTEGER,primaryKey: true},
    nombre: {type: DataTypes.STRING, allowNull:false},
    correo: {type: DataTypes.STRING, allowNull:false},
    password: {type: DataTypes.STRING, allowNull:false},
    direccion: {type: DataTypes.STRING, allowNull:false},
    num_patente: {type: DataTypes.STRING, allowNull:false},
    telefono: {type: DataTypes.STRING, allowNull:false},
    descrip_s: {type: DataTypes.STRING, allowNull:false},
    descrip_l: {type: DataTypes.STRING, allowNull:false},
    imagen: {type: DataTypes.STRING, allowNull:true},
    horario: {type: DataTypes.STRING, allowNull:false},
    calificacion: {type: DataTypes.INTEGER, allowNull:false},
    disp: {type: DataTypes.BOOLEAN, allowNull:false},
    estado: {type: DataTypes.BOOLEAN, allowNull:false},
        
  }, {
    sequelize,
    modelName: 'Negocio',
    timestamps: false,
    freezeTableName: true, //Pluralizacion para el nombre de las tablas
    tableName: 'rests'
  });
  return Negocio;
};
