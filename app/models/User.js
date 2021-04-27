'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    } 
  };

  User.init({
    id: {type: DataTypes.INTEGER,allowNull: false, autoIncrement: true, primaryKey:true },
    nombre: {type: DataTypes.STRING, allowNull:false},
    apellidos: {type: DataTypes.STRING, allowNull:false},
    CI: {type: DataTypes.STRING, allowNull:false,unique: true},
    movil: {type: DataTypes.STRING, allowNull:false},
    telefono: {type: DataTypes.STRING, allowNull:false},
    password: {type: DataTypes.STRING, allowNull:false},
    activo: {type: DataTypes.BOOLEAN, allowNull:false},
    verificado: {type: DataTypes.BOOLEAN, allowNull:false}, 
    
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
    freezeTableName: true, //Pluralizacion para el nombre de las tablas
    tableName: 'users'
  });
  return User;
};
