var Sequelize = require('sequelize');

var env = process.env.ENVIRONMENT;

mainDb = new Sequelize(process.env[`DB_NAME_${env}`], process.env[`DB_USER_${env}`], process.env[`DB_PASSWORD_${env}`], {
  host: process.env[`DB_HOST_${env}`],
  dialect: 'postgres',
  logging: true,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});


// console.log(mainDb)
// process.exit();

var bcrypt = require('bcryptjs');

var validPassword = function (password) {
  return password && password.length >= 6;
};

var generateHash = function (password, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      callback(hash);
    });
  });
};

UserRecord = mainDb.define('user', {
  username: {
    type: Sequelize.STRING
  },
  passwordHash: {
    type: Sequelize.STRING
  }
}, {
  instanceMethods: {
    hasPassword: function (password, callback) {
      bcrypt.compare(password, this.passwordHash, callback);
    }
  },
  classMethods: {
    register: function (data) {
      return new Promise(function (res, rej) {
        UserRecord.findOne({
          where: {
            username: {
              $iLike: data.username
            }
          }
        }).then(function (user) {
          if (user) {
            rej({error: 'Username Not Available'});
          } else {
            if (!validPassword(data.password)) {
              rej({error: 'Invalid Password'});
              return;
            }
            generateHash(data.password, function (passwordHash) {
              var user = User.build({
                username: data.username,
                passwordHash: passwordHash
              });
              user.save().then(function () {
                res(user);
              });
            });
          }
        });
      })
      
    },
    login: function (data, callback) {
      UserRecord.findOne({
        where: {
          username: {
            $iLike: data.username
          }
        }
      }).then(function (user) {
        if (!user) {
          callback(null);
        } else {
          user.hasPassword(data.password, function (err, result) {
            if (result) {
              callback(null, user);
            } else {
              callback(err, null);
            }
          });
        }
      });
    }
  }
})