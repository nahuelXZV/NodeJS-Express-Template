const bcrypt = require('bcrypt');

const iterations = 10;

function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

function hashPassword(password) {
  return bcrypt.hash(password, iterations);
}

module.exports = {
  comparePassword,
  hashPassword,
};
