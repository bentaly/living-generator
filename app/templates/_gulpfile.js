'use strict';

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var plugins = require('gulp-load-plugins')({ lazy: false });

require('./gulp/build');

// watch for changes in html, js and css, then rebuild
gulp.task('watch', function(){
    gulp.watch(['./app/**/*.js', '!./app/**/*test.js'], ['scripts']);
    gulp.watch(['./app/css/**/*.scss'], ['styles']);
    gulp.watch('./app/index.html', ['copy-index']);
});

gulp.task('sass', function () {
  gulp.src('./app/css/*.scss')
    .pipe(sass())
    .pipe(plugins.concat('app-sass.css'))
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest('./dist/app/css'));
});

gulp.task('webserver', function() {
  console.log('Starting the server, give me a second')
  setTimeout(function(){
    gulp.src('./dist/app')
    .pipe(plugins.webserver({
      open: true,
      port: 3000
    }));  
  }, 3500)
  
});


gulp.task('default', ['full-build']);
gulp.task('run', ['webserver']);
