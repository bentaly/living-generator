'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({ lazy: false });
var sass = require('gulp-ruby-sass');

var app = '<%= appName %>';
var buildDir = './dist/' + app + '/app';
var appDir = './apps/' + app + '/app';

// bower dependencies
var jsDeps = [
  '!./bower_components/**/*.min.js',
  '!./bower_components/jasmine/**/*.js',
  '!./bower_components/jasmine-jquery/**/*.js',
  '!./bower_components/angular-ui-router/*',
  '!./bower_components/angular-mocks/*.js',
  './bower_components/angular/angular.js',
  <% if (ngAnimate) { %>'./bower_components/angular-animate/angular-animate.js',<% } %>
  <% if (ngCookies) { %>'./bower_components/angular-cookies/angular-cookies.js',<% } %>
  './bower_components/angular-route/angular-route.js',
  <% if (ngSanitize) { %>'./bower_components/angular-sanitize/angular-sanitize.js',<% } %>
  <% if (ngTouch) { %>'./bower_components/angular-touch/angular-touch.js',<% } %>
  <% if (includeModernizr) { %>'./bower_components/modernizr/modernizr.js', <% } %>
  <% if (includeIonic) { %>
  './bower_components/ionic/release/js/ionic.js',
  './bower_components/angular-ui-router/release/angular-ui-router.js',
  './bower_components/ionic/release/js/ionic-angular.js',
  <% } %>
  <% if (includeJQuery) { %>'./bower_components/jquery/dist/jquery.js', <% } %>
  <% if (includeBootstrap) { %>'./bower_components/bootstrap-sass-official/assets/javascripts/**/*.js' <% } %>
];

var styleDeps = [
  <% if (includeBootstrap) { %> './bower_components/bootstrap-sass-official/assets/stylesheets/*.scss',  <% } %>
  './commons/styles/main.scss', 
  appDir + '/css/*.css', appDir + '/css/*.scss',
];

var fontDeps = [
  './commons/fonts/*', 
  appDir + '/fonts/**/*', 
  <% if (includeBootstrap) { %> './bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*' <% } %>
];

gulp.task('<%= appAbbr %>:sass', function () {
  gulp.src(appDir + '/css/*.scss')
    .pipe(sass())
    .pipe(plugins.concat('app-sass.css'))
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest(buildDir + '/css'));
});

// combine all js files, ignoring tests
gulp.task('<%= appAbbr %>:scripts', function() {
  gulp.src(['!./**/*.spec.js', appDir + '/js/**/*.js'])
    .pipe(plugins.concat('app.js'))
    .pipe(gulp.dest(buildDir + '/js'));
});

// combine all template files of the app into a js file
gulp.task('<%= appAbbr %>:templates', function() {
  gulp.src(['!' + appDir + '/index.html', appDir + '/templates/*.html'])
    .pipe(plugins.angularTemplatecache('templates.js', {
      standalone: true,
      root: 'templates'
    }))
    .pipe(gulp.dest(buildDir + '/js'));
});

// copy over fonts
gulp.task('<%= appAbbr %>:fonts', function() {
  gulp.src(fontDeps)
    .pipe(gulp.dest(buildDir + '/fonts'))
});

// copy over images
gulp.task('<%= appAbbr %>:images', function() {
  gulp.src([appDir + '/images/**/*'])
    .pipe(gulp.dest(buildDir + '/images'))
});

// compile dependencies
gulp.task('<%= appAbbr %>:vendor-js', function() {
  gulp.src(jsDeps)
    .pipe(plugins.concat('lib.js'))
    .pipe(gulp.dest(buildDir + '/js'));
});

// compile app styles
gulp.task('<%= appAbbr %>:styles', function() {
  gulp.src(styleDeps)
    .pipe(plugins.rubySass({style: 'expanded'}))
    .pipe(plugins.autoprefixer('last 1 version'))
    .pipe(plugins.concat('app.css'))
    .pipe(gulp.dest(buildDir + '/css'));
});

// copy the index file
gulp.task('<%= appAbbr %>:copy-index', function() {
  gulp.src(appDir + '/index.html')
    .pipe(gulp.dest(buildDir));
});

// just clean up build dir
gulp.task('<%= appAbbr %>:clean', function () {
  return gulp.src([ buildDir ], { read: false }).pipe(plugins.rimraf());
});

// define the actual build task
gulp.task('<%= appAbbr %>:full-build', function() {
  gulp.start('<%= appAbbr %>:scripts', '<%= appAbbr %>:templates', '<%= appAbbr %>:styles', '<%= appAbbr %>:sass', '<%= appAbbr %>:copy-index', '<%= appAbbr %>:vendor-js', '<%= appAbbr %>:fonts', '<%= appAbbr %>:images', '<%= appAbbr %>:watch', '<%= appAbbr %>:webserver');
});