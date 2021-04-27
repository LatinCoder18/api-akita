//Server
//Q es cor
//helmet
//ORM Sequelize
//express-validator

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require("method-override");
require('dotenv').config();
const addRequestId = require('express-request-id')();
const logger = require('./config/logger');
const rutas = require('./routes/rutas');
const config_passport = require('./config/auth');
const Sequelize = require('sequelize');
const cors = require('cors');

//const port = Number(process.env.APP_PORT || 5000);
const port = 8080;
const app = express();

//Logger
app.use(addRequestId);
app.use(logger.morgan);

//Middleware Body Parser
app.use(bodyParser.urlencoded({
    extended: false
})); //Que es extended
app.use(bodyParser.json());

//Middleware Override Method
app.use(methodOverride());

app.use(cors());

//Passport Inicializar
app.use(config_passport);

//Middleware para archivos static
app.use('/static', express.static(path.join(__dirname, 'public')));

//Middleware de Rutas
app.use(rutas);

const server = app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}!`);
});
module.exports = app;
