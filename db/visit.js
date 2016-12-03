var Sequelize = require('sequelize');

module.exports = function (sequelize) {
  var Visit = sequelize.define('visit', {
    username: {
      type: Sequelize.STRING,  
    },
    url: {
      type: Sequelize.STRING
    }
  });
  
  return Visit;
}