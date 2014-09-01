'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({ lazy: false });

require('./gulp/build');

var app = '<%= appName %>';
var appDir = './apps/' + app;

// watch for changes in html, js and css, then rebuild
gulp.task('<%= appAbbr %>:watch', function(){
    gulp.watch([appDir + '/app/**/*.js', '!' + appDir + '/app/**/*test.js'], ['<%= appAbbr %>:scripts']);
    gulp.watch([appDir + '/app/css/**/*.scss'], ['<%= appAbbr %>:styles']);
    gulp.watch(appDir + '/app/index.html', ['<%= appAbbr %>:copy-index']);
});

gulp.task('<%= appAbbr %>:webserver', function() {
  console.log('Starting the server, give me a second')
  setTimeout(function(){
    gulp.src('./dist/' + app + '/app')
    .pipe(plugins.webserver({
      open: true,
      port: 3000
    }));  
  }, 3500)
});


gulp.task('default', ['<%= appAbbr %>:full-build']);
gulp.task('<%= appAbbr %>:build', ['<%= appAbbr %>:full-build']);