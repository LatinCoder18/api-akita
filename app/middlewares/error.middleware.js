
const logger =require('../config/logger');

function errorMiddleware(error, req, res, next) {
    let { status = 500, message, data } = error;
    // If status code is 500 - change the message to Intrnal server error
    message = status === 500 && !message ? 'Internal server error' : message;

    error = {
        type: 'error',
        status,
        message,
        ...(data) && data
    }
    logger.error(`${logger.header(req)} ${error.status} ${error.message}`);
    res.status(status).send(error);
}

module.exports = errorMiddleware;
/*
{
    type: 'error',
    status: 404,
    message: 'Not Found'
    data: {...} // optional
}
*/
