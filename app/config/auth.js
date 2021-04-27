//Configuracion de Auth con Passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const argon2 = require('argon2');
const db = require('../models');

//Estrategia Local para Passport;
const config = async (req, res, next) => {
  const authFields = {
    usernameField: 'movil',
    passwordField: 'password',
    session: false
  };
  passport.use('user',
    new LocalStrategy(authFields, async (username, password, cb) => {
      try {
        const user = await db.User.findOne({
          where: { movil: username }
        });
        //Revisar campos dinamicos
        if (!user || !user.password) {
          return cb(null, false, {
            message: 'Incorrect email'
          });
        }
        const checkPassword = await argon2.verify(user.password, password);
        if (!checkPassword) {
          return cb(null, false, {
            message: 'Incorrect password.'
          });
        }
        return cb(null, user, {
          message: 'Logged In Successfully'
        });

      } 
      catch (err) {
        if(err.message ==="Cannot read property 'm' of undefined" || 
        err.message === "pchstr must contain a $ as first char"){
          console.log('Problema con argon2');
          err.message='Internal server error. Error 0x000001'
        }
        return cb(err, false, {
          statusCode: 400,
          message: err.message
        });
      }
    }),
  );

  //Estrategia passport-jwt
  let opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //Desde el header Authorization
  opts.secretOrKey = process.env.SECRET_JWT;
  opts.ignoreExpiration = false;
  passport.use(new JwtStrategy(opts, async (jwt_payload, cb) => {
    try {
      const user = await User.findOne({
        id: jwt_payload.sub
      })
      if (!user) {
        //throw new HttpException(401, 'Authentication failed!');
        return cb(null, false, {
          message: 'El token ha expirado'
        });
      }
      return cb(null, user)
    } catch (err) {
      return cb(err, false)
    }
  }));

  passport.initialize();
  next();
}

module.exports = config;
