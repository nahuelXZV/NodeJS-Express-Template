const response = require("../network/response");

function logError(err, req, res, next) {
  //console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  response.error(req, res, err, 500, err);
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    response.error(req, res, output.payload, output.statusCode, output);
  }
  next(err);
}


module.exports = { logError, errorHandler, boomErrorHandler };
