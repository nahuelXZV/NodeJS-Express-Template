const response = require("../network/response");

function logError(err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  response.error(req, res, err, 500, err);
}

module.exports = { logError, errorHandler };
