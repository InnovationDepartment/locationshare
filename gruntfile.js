module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.config.set('mochaTest', {
    socket: {
      options: {
        reporter: 'spec',
        timeout: 18000
      },
      src: [
        'tests/test.js'
      ]
    }
  });

  grunt.registerTask('default', 'mochaTest');

  return grunt;
};

