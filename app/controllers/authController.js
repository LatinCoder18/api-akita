const passport = require('passport');
const db = require('../models');
const HttpException = require('../utils/HttpException');
const jwt = require('jsonwebtoken');
//const { validationResult } = require('express-validator');
const argon2 = require('argon2');
const dotenv = require('dotenv').config();

/******************************************************************************
 *                              Auth Controller
 ******************************************************************************/
class authController {

  getAuth = async (req, res, next)=> {
    console.log('OK');
    res.send('Hola');
  }

  userLogin = async (req, res, next) => {
    //this.checkValidation(req);
    passport.authenticate("user", { session: false }, (error, user, info) => {
        if(error){
          next(error);
        }
        else if (!user) {
          next(new HttpException(401,info.message));
        } 
        else {
          const payload = {
            sub: user.id,
            //iat: Date.now() + parseInt(process.env.JWT_EXPIRATION),//Cuando se crea?
            //iat: Date.now() + parseInt(2),
            username: user.nombre,
            rol: 'admin'
          };
          /*const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET || "", {
            algorithm: process.env.JWT_ALGORITHM,
            expiresIn: '24h'
          });*/
          const token =  jwt.sign(payload, process.env.SECRET_JWT,{
            expiresIn: '10h'
          });
          user.dataValues.token=token;
          user.dataValues.password = null;
          res.send(JSON.stringify(user,null,2));
        }
      })
      (req, res,next) 
  };


}
/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new authController;
