'use strict';

var faker = require('Faker');
var should = require('should');
var request = require('request');

describe('AuthController', function () {
  it('can register', function (done) {
    request('/register', function (error, response, body) {
      response.statusCode.should.equal(404);
      done();
    })
  });

  it('can login', function (done) {
    request('/login', function (error, response, body) {
      response.statusCode.should.equal(404);
      done();
    })
  });
});