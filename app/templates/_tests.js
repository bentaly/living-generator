'use strict';

var gulp = require('gulp');
var wiredep = require('wiredep');
var karma = require('karma');
var _ = require('lodash');

var getGlobalKarmaConf = function() {
  var bowerDeps = wiredep({
    directory: 'bower_components',
    exclude: ['bootstrap-sass-official'],
    dependencies: true,
    devDependencies: true
  });

  var testFiles = bowerDeps.js.concat([
    'dist/**/*.js',
    'test/unit/**/*.js',
    {
      pattern: 'test/mock/**/*.json',
      watched: true,
      served: true,
      included: false
    }
  ]);

  return {
    frameworks: ['jasmine'],
    files : testFiles
  };
};

// run unit tests once in PhantomJS (used by the build)
gulp.task('unit-tests-pjs-once', function(done) {
  var conf = _.assign(getGlobalKarmaConf(), {
    browsers: ['PhantomJS'],
    singleRun: true
  });
  karma.server.start(conf, done);
});

// run unit tests continuously (listen to file modifications) in PhantomJS (used for developing)
gulp.task('unit-tests-pjs-continuous', function(done) {
  var conf = _.assign(getGlobalKarmaConf(), { browsers: ['PhantomJS'] });
  karma.server.start(conf, done);
});

// run unit tests continuously (listen to file modifications) in Chrome (used for developing)
gulp.task('unit-tests-chrome-continuous', function(done) {
  var conf = _.assign(getGlobalKarmaConf(), { browsers: ['Chrome'] });
  karma.server.start(conf, done);
});
