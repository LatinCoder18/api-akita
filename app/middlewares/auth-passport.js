//Middleware Auth

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const HttpException = require('../utils/HttpException');
const dotenv = require('dotenv').config();
const User = require('../models/User');
const logger= require('../config/logger.js');

ensureAuthenticated =async (req, res, next) => {
  
  let optionsAuthenticate = {
    session: false,
    successRedirect: '/',
    failureredirect: '/login'
  }
  passport.authenticate('jwt', optionsAuthenticate, (err, user, info) => {
      
      //si hubo un error en la consulta a la base de datos
      if (err) {
        return next(err);
      }
      if (!user) {
        logger.warn(`${logger.header(req)} 403 You are not access`);
        return next(new HttpException(403,"You are not allowed to access."));
      }
      //si hubo un error relacionado con la validez del token (error en su firma, caducado, etc)
      if (info) {
        logger.warn(`${info.message} => ${logger.header(req)}`);
        return next(new HttpException(401,info.message));
      }
      //si el token está firmado correctamente pero no pertenece a un usuario existente
      
      //inyectamos los datos de usuario en la request
      req.user = user;
      next();
    })
    (req, res, next);
}

module.exports = ensureAuthenticated;
