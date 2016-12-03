'use strict';

require('./../secret');

process.env.ENVIRONMENT = 'TEST';
process.env.PORT = 7654;
process.env.request_base = 'http://localhost:7654';

require('./../db/db');
var index = require('./../index');

var _ = require('lodash');
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

    socket.on('connect', function() {
      socket.emit('register', { username: 'a', password: 'password' })
    });
    socket.on('registered', function (user) {
      should(user.id).be.ok;
      done();
    });
    socket.on('register-fail', function(data) {
      should(user.id).not.be.ok;
      done();
    });
  });

  it('cant register unique username', function (done) {
    var socket = io('http://localhost:7654');
    
    socket.on('connect', function() {
      socket.emit('register', { username: 'a', password: 'password' })
    });
    socket.on('registered', function (user) {
      socket.emit('register', { username: 'a', password: 'password' })
    });
    socket.on('register-fail', function(data) {
      done();
    });
  });

  it('can visit', function (done) {
    var socket = io('http://localhost:7654');
    var socket2 = io('http://localhost:7654');
    
    socket.on('connect', function() {
      socket.emit('register', { username: 'a', password: 'password' })
    });
    socket.on('registered', function (user) {
      socket.emit('visit', {
        username: 'a',
        url: 'test url'
      })
    });
    socket2.on('new-visit', function(data) {
      data.username.should.equal('a');
      data.url.should.equal('test url');

      done();
    });
  })
});