'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.config.set('mochaTest', {
    models: {
      options: {
        reporter: 'spec',
        timeout: 18000
      },
      src: [
        'tests/user-tests.js'
      ]
    },

    socket: {
      options: {
        reporter: 'spec',
        timeout: 2000
      },
      src: [
        'tests/user-tests.js'
      ]
    },
  });

  grunt.registerTask('default', 'mochaTest');

  return grunt;
};

