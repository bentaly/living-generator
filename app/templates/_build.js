'use strict';

var gulp = require('gulp');
var buildDir = './dist';
var plugins = require('gulp-load-plugins')({ lazy: false });

// bower dependencies
var jsDeps = [
  '!./../../bower_components/**/*.min.js',
  '!./../../bower_components/jasmine/**/*.js',
  '!./../../bower_components/jasmine-jquery/**/*.js',
  '!./../../bower_components/angular-ui-router/*',
  '!./../../bower_components/angular-mocks/*.js',
  './../../bower_components/angular/angular.js',
  <% if (ngAnimate) { %>'./../../bower_components/angular-animate/angular-animate.js',<% } %>
  <% if (ngCookies) { %>'./../../bower_components/angular-cookies/angular-cookies.js',<% } %>
  './../../bower_components/angular-route/angular-route.js',
  <% if (ngSanitize) { %>'./../../bower_components/angular-sanitize/angular-sanitize.js',<% } %>
  <% if (ngTouch) { %>'./../../bower_components/angular-touch/angular-touch.js',<% } %>
  <% if (includeModernizr) { %>'./../../bower_components/modernizr/modernizr.js', <% } %>
  <% if (includeIonic) { %>
    './../../bower_components/ionic/release/js/ionic.js',
    './../../bower_components/angular-ui-router/release/angular-ui-router.js',
    './../../bower_components/ionic/release/js/ionic-angular.js',
  <% } %>
  <% if (includeJQuery) { %>'./../../bower_components/jquery/dist/jquery.js', <% } %>
  <% if (includeBootstrap) { %>'./../../bower_components/bootstrap-sass-official/assets/javascripts/**/*.js' <% } %>
];

var styleDeps = [
  <% if (includeBootstrap) { %> './../../bower_components/bootstrap-sass-official/assets/stylesheets/*.scss',  <% } %>
  './../../commons/styles/main.scss', 
  './app/css/*.css', './app/css/*.scss',
];

var fontDeps = [
  './../../commons/fonts/*', 
  './app/fonts/**/*', 
  <% if (includeBootstrap) { %> './../../bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*' <% } %>
];

// combine all js files, ignoring tests
gulp.task('scripts', function() {
  gulp.src(['!./**/*.spec.js', './app/js/**/*.js'])
    .pipe(plugins.concat('app.js'))
    .pipe(gulp.dest(buildDir + '/app/js'));
});

// combine all template files of the app into a js file
gulp.task('templates', function() {
  gulp.src(['!./app/index.html', './app/templates/*.html'])
    .pipe(plugins.angularTemplatecache('templates.js', {
      standalone: true,
      root: 'templates'
    }))
    .pipe(gulp.dest(buildDir + '/app/js'));
});

// copy over fonts
gulp.task('fonts', function() {
  gulp.src(fontDeps)
    .pipe(gulp.dest(buildDir + '/app/fonts'))
});

// copy over images
gulp.task('images', function() {
  gulp.src(['./app/images/**/*'])
    .pipe(gulp.dest(buildDir + '/app/images'))
});

// compile dependencies
gulp.task('vendor-js', function() {
  gulp.src(jsDeps)
    .pipe(plugins.concat('lib.js'))
    .pipe(gulp.dest(buildDir + '/app/js'));
});

// compile app styles
gulp.task('styles', function() {
  gulp.src(styleDeps)
    .pipe(plugins.rubySass({style: 'expanded'}))
    .pipe(plugins.autoprefixer('last 1 version'))
    .pipe(plugins.concat('app.css'))
    .pipe(gulp.dest(buildDir + '/app/css'));
});

// copy the index file
gulp.task('copy-index', function() {
  gulp.src('./app/index.html')
    .pipe(gulp.dest(buildDir + '/app'));
});

// just clean up build dir
gulp.task('clean', function () {
  return gulp.src([ buildDir ], { read: false }).pipe(plugins.rimraf());
});

// define the actual build task
gulp.task('full-build', function() {
  // gulp.start('scripts', 'templates', 'styles', 'sass', 'copy-index', 'vendor-js', 'fonts', 'images');
  gulp.start('scripts', 'templates', 'styles', 'sass', 'copy-index', 'vendor-js', 'fonts', 'images', 'webserver');
});