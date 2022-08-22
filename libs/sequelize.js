const setupModels = require('./../database/models');
const config = require('../config/config');
const { Sequelize } = require('sequelize');

const user = encodeURIComponent(config.DB_USERNAME);
const password = encodeURIComponent(config.DB_PASSWORD);
const host = encodeURIComponent(config.DB_HOST);
const port = config.DB_PORT;
const database = config.DB_DATABASE;
const typeDatabase = config.DB_CONNECTION;

const url = `${typeDatabase}://${user}:${password}@${host}:${port}/${database}`;

const options = {
  dialect: config.DB_CONNECTION,  // 'mysql' | 'sqlite' | 'postgres' | 'mariadb' | 'mssql'
  logging: false,  // false
}

if (config.APP_PROD === 'true') {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}
const sequelizeConnection = new Sequelize(url, options);  // create a new sequelize instance

setupModels(sequelizeConnection); // setup models
module.exports = sequelizeConnection;
