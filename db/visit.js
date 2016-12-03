var Sequelize = require('sequelize');
var _ = require('lodash');

module.exports = function (sequelize) {
  var Visit = sequelize.define('visit', {
    username: {
      type: Sequelize.STRING,  
    },
    url: {
      type: Sequelize.STRING
    }
  }, {
    instanceMethods: {

    },
    classMethods: {
    	allVisits: function () {
    		return new Promise(function (resolve, reject) {
	    		VisitRecord.findAll().then(function(results) {
			      if (results) {
			        resolve(results);
			      } else {
			        resolve();
			      }
			    });
    		});
    	},
    	userVisits: function (username) {
    		return new Promise(function (resolve, reject) {
	    		VisitRecord.findAll({
	    			where: {
	    				username: username
	    			}
	    		}).then(function(results) {
			      if (results) {
			        resolve(results);
			      } else {
			        resolve();
			      }
			    });
    		});
    	},
    	recentVisits: function () {
    		return new Promise(function (resolve, reject) {
	    		VisitRecord.findAll().then(function(results) {
			      if (results) {
			        var visits = _.sortBy(results, 'createdAt').slice(0, 4);;
			        resolve(visits);
			      } else {
			        resolve();
			      }
			    });
    		});
    	},
    	popularVisits: function () {
    		return new Promise(function (resolve, reject) {
	    		VisitRecord.findAll({
	    			group: ['url']
	    		}).then(function(results) {
			      if (results) {
			        resolve(results);
			      } else {
			        resolve();
			      }
			    });
    		});
    	}
    }
  });
  
  return Visit;
}