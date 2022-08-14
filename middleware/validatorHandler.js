const boom = require('@hapi/boom');

const validatorHandle = (schema, check = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[check], { abortEarly: false });
    error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = validatorHandle;
