var express = require('express');
var router = express.Router();
const HttpException = require('../utils/HttpException')
const rutasAPI = require('./rutasAPI')
const errorMiddleware = require('../middlewares/error.middleware');
// import all controllers
// import SessionController from './app/controllers/SessionController';


// Add routes
router.use(function timeLog(req, res, next) {
  /*console.log(`Params ${req.params}`);
  console.log(`Body ${req.body}`);
  console.log(`Query ${req.query}`);
  console.log(`Request ${req}`);
  */
  next();
});

router.use(`/api/${process.env.VERSION_API}`, rutasAPI);

//Rutas de view Pruebas
router.get('/', function(req, res) {
    res.send('welcome ');
});
// define the about route
 
router.all('*', (req, res, next) => {
    next( new HttpException(404, 'HTTP Not Found'));
});

router.use(errorMiddleware);

module.exports = router;
