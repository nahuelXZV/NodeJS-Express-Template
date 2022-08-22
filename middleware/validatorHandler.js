const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property]; // Get data from request
    const { error } = schema.validate(data, { abortEarly: false }); // Validate data
    if (error) {
      next(boom.badRequest(error)); // Send error to next middleware
    }
    next();
  }
}

module.exports = validatorHandler;
