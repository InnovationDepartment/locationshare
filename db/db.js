var Sequelize = require('sequelize');

var dbName = 'windowdotlocation';

mainDb = new Sequelize(dbName, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

UserRecord = require('./user')(mainDb);