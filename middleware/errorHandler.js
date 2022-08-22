const response = require("../network/response");
const { ValidationError } = require('sequelize');

function logError(err, req, res, next) {  // Log error in console
  console.error(err);
  next(err);
}

function ormErrorHandler(err, req, res, next) { // Send error to client
  if (err instanceof ValidationError) { // Validation error
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
}

function boomErrorHandler(err, req, res, next) {  // Send error to client
  if (err.isBoom) {
    const { output } = err; // Get error data
    response.error(req, res, output.payload, output.statusCode, output);
  }
  next(err);
}

function errorHandler(err, req, res, next) {  // Send error to client
  response.error(req, res, err, 500, err);
}

module.exports = { logError, errorHandler, boomErrorHandler, ormErrorHandler };
