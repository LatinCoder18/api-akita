'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    //Declarar metodos del modelo

    static associate(models) {
      // define association here
      Producto.belongsTo(models.Negocio, {
        as: 'negocio',
        foreignKey: 'rest_id',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      })
    }
  };

  Producto.init({
    id: {type: DataTypes.INTEGER.UNSIGNED,primaryKey: true},
    nombre: {type: DataTypes.STRING, allowNull:false},
    precio: {type: DataTypes.FLOAT, allowNull:false},
    descrip: {type: DataTypes.STRING, allowNull:false},
    disp: {type: DataTypes.BOOLEAN, allowNull:false},
    imagen: {type: DataTypes.STRING, allowNull:false},
    categoria: {type: DataTypes.STRING, allowNull:false}
    /*rest_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      references:{model: Negocio,key: 'id'}
    }*/
}, {
    sequelize,
    modelName: 'Producto',
    timestamps: true,
    freezeTableName: true, //Pluralizacion para el nombre de las tablas
    tableName: 'productos'
  });
  return Producto;
};
