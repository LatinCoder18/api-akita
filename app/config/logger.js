//Configuracion del Logger
const winston = require('winston');
const morgan = require('morgan');
const path = require('path');
const stripFinalNewline = require('strip-final-newline');

// Setup logger
const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({
      json: false,
      handleExceptions: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: path.join(__dirname,'../logs/logger.log'),
      handleExceptions: true,
      json: true,
      colorize: false
    })
  ],
});

// Setup requests morgan logger
morgan.token('id', req => req.id);

const requestFormat = ':id -> :remote-addr -- :remote-user ":method :url" :status [:date[web]] :response-time[3]-:total-time[3]ms';
const devFormat = ':method :url :status :response-time[3]-:total-time[3] ms - :res[content-length]';
const shortFormat =':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'

const requests = morgan(requestFormat , {
  stream: {
    write: (message) => {
      //return logger.info(stripFinalNewline(message));
      //return logger.info(message);
      return logger.verbose(message)

    },
  },
});

logger.morgan = requests;

logger.header = (req) => {
  const date = new Date().toISOString();
  return `${req.id} -> ${req.ip} "${req.method} ${req.originalUrl}" [${date}]`;
};

module.exports = logger;
