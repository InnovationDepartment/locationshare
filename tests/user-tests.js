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
var socket = io('http://localhost:7654');

describe('AuthController', function () {
  it('can register', function (done) {
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
});