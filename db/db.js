var Sequelize = require('sequelize');

var env = process.env.ENVIRONMENT;
mainDb = new Sequelize(process.env[`DB_NAME_${env}`], process.env[`DB_USER_${env}`], process.env[`DB_PASSWORD_${env}`], {
  host: process.env[`DB_HOST_${env}`],
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

VisitRecord = require('./visit')(mainDb);
UserRecord = require('./user')(mainDb);