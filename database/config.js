const config = require('./../config/config');

const user = encodeURIComponent(config.DB_USERNAME);
const password = encodeURIComponent(config.DB_PASSWORD);
const host = encodeURIComponent(config.DB_HOST);
const port = config.DB_PORT;
const database = config.DB_DATABASE;
const typeDatabase = config.DB_CONNECTION;

const url = `${typeDatabase}://${user}:${password}@${host}:${port}/${database}`;

module.exports = {
  development: {
    url: url,
    dialect: typeDatabase,
  },
  production: {
    url: url,
    dialect: typeDatabase,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
};


