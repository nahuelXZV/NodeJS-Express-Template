const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

function checkRoles(...roles) {
  return (req, res, next) => {
    if (!req.headers.authorization) {
      next(boom.unauthorized());
    }
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(token, config.JWT_AUTH);
    const id = payload.sub;
    models.User.findByPk(id).then((user) => {
      if (user && roles.includes(user.role)) {
        next();
      } else {
        next(boom.unauthorized());
      }
    });
  }
}

module.exports = { checkRoles };
