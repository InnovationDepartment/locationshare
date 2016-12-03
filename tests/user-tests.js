'use strict';

'use strict';

var _ = require('lodash');

require('./../secret');

process.env.ENVIRONMENT = 'TEST';
require('./../db/db');
process.env.PORT = 7654;
process.env.request_base = 'http://localhost:7654';

var index = require('./../index');


var faker = require('Faker');
var should = require('should');
var request = require('request');
var io = require('socket.io-client');

describe('AuthController', function () {
  beforeEach(function (done) {
    mainDb.sync({ force: true }).then(function () {
      done();
    }).catch( function (argument) {
      console.log(arguments);
    });
  });
  it('can register', function (done) {
    var socket = io('http://localhost:7654');

    socket.on('connect', function(){
      socket.emit('register', { username: 'a', password: 'password' })
    });
    socket.on('registered', function (user) {
      should(user.id).be.ok;
      done();
    });
    socket.on('register-fail', function(data){
      should(user.id).not.be.ok;
      done();
    });
  });
  it('cant register unique username', function (done) {
    var socket = io('http://localhost:7654');
    
    socket.on('connect', function(){
      socket.emit('register', { username: 'a', password: 'password' })
    });
    socket.on('registered', function (user) {
      socket.emit('register', { username: 'a', password: 'password' })
    });
    socket.on('register-fail', function(data){
      done();
    });
  });
});