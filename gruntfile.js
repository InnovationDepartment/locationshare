'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.config.set('mochaTest', {
    models: {
      options: {
        reporter: 'spec',
        timeout: 8000
      },
      src: [
        'test/user-tests.js'
      ]
    },

    requests: {
      options: {
        reporter: 'spec',
        timeout: 2000
      },
      src: [
        'test/user-tests.js'
      ]
    },
  });

  grunt.registerTask('default', 'mochaTest');

  return grunt;
};

