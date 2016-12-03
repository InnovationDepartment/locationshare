var Sequelize = require('sequelize');

var dbName = 'windowdot';
var env = process.env.ENVIRONMENT;

mainDb = new Sequelize(dbName, process.env[`DB_USER_${env}`], process.env[`DB_PASSWORD_${env}`], {
  host: process.env[`DB_HOST_${env}`],
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

UserRecord = require('./user')(mainDb);