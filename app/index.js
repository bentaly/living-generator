'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var tap = require('gulp-tap');

var LivingappGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  appnamepromting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the Living app generator! :)'
    ));
    
// console.log("1" + path.basename(file.path));
    // tap(function (file,t) {
    //   console.log("hello");
    //         console.log("2" + path.basename(file.path));
    //         // console.log("3" + t));
    //         // Do something with the file name
    //     })

    var prompts = [{
      name: 'appName',
      message: 'What\'s the app name? ' + chalk.bold.red('Must be name of parent directory')
    }];




    this.prompt(prompts, function (props) {

      this.fullAppName = props.appName;

      //converts the user input into camel case
      this.appName = props.appName.toLowerCase().replace(/-(.)/g, function(match, group1) {
          return group1.toUpperCase();
      });
  
      done();
    }.bind(this));
  },

  appnameshortpromting: function () {
    var done = this.async();

    var prompts = [{
      name: 'appAbbr',
      message: 'Provide an abbreviation of ' + this.fullAppName + ' for console runnning',
      default: 'livapp'
    }];

    this.prompt(prompts, function (props) {

      this.appAbbr = props.appAbbr;

      done();
    }.bind(this));
  },

  ionicprompting: function () {
    var done = this.async();
    
    var prompts = [{
      name: 'ionic',
      message: 'Do you want to use Ionic? It\'s a great tool for building HTML5 mobile apps',
      default: 'y'
    }];

    this.prompt(prompts, function (props) {

      this.includeIonic = props.ionic.toLowerCase() == 'y';

      done();
    }.bind(this));
  },  

  modernizrprompting: function () {
    var done = this.async();
    
    var prompts = [{
      name: 'modernizr',
      message: 'Do you want to use Modernizr? It\'s a cool tool for detecting features for compatability sake',
      default: 'y'
    }];

    this.prompt(prompts, function (props) {

      this.includeModernizr = props.modernizr.toLowerCase() == 'y';

      done();
    }.bind(this));
  },  
  
  moduleprompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'modules',
      message: 'Which angular modules would you like to include?',
      choices: [
      {
        value: 'animateModule',
        name: 'angular-animate.js',
        checked: true
      }, {
        value: 'cookiesModule',
        name: 'angular-cookies.js',
        checked: true
      }, {
        value: 'sanitizeModule',
        name: 'angular-sanitize.js',
        checked: true
      }, {
        value: 'touchModule',
        name: 'angular-touch.js',
        checked: true
      }
      ]
    }];

    this.prompt(prompts, function (props) {

      var hasMod = function (mod) { return props.modules.indexOf(mod) !== -1; };
      this.animateModule = hasMod('animateModule');
      this.cookiesModule = hasMod('cookiesModule');
      this.sanitizeModule = hasMod('sanitizeModule');
      this.touchModule = hasMod('touchModule');

      this.bowerComps = {
        'ngAnimate': this.animateModule,
        'ngCookies': this.cookiesModule,
        'ngSanitize' : this.sanitizeModule,
        'ngTouch': this.touchModule,
        'includeIonic': this.includeIonic,
        'includeModernizr': this.includeModernizr
      };

      var angMods = ["'templates', 'ngRoute'"];

      if (this.animateModule) {
        angMods.push("'ngAnimate'");
      }

      if (this.cookiesModule) {
        angMods.push("'ngCookies'");
      }

      if (this.sanitizeModule) {
        angMods.push("'ngSanitize'");
      }

      if (this.touchModule) {
        angMods.push("'ngTouch'");
      }

      if (this.includeIonic) {
        angMods.push("'ionic'");
      } 

      if (angMods.length) {
        this.angularModules = '\n    ' + angMods.join(',\n    ') + '\n  ';
      }

      done();
      
    }.bind(this));
  },

  stylepromting: function () {
    var done = this.async();

    var prompts = [{
      name: 'includeBootstrap',
      message: 'Do you want to use Bootstrap (Sass version) y/n? Default:',
      default: 'y'
    }];

    this.prompt(prompts, function (answer) {

      this.includeBootstrap = answer.includeBootstrap.toLowerCase() === 'y';
      this.includeJQuery = this.includeBootstrap;
        
      done();
    }.bind(this));
  },

  jquerypromting: function () {

    if (!this.includeJQuery) {

      var done = this.async();

      var prompts = [{
        name: 'includeJQuery',
        message: 'Do you want to use jQuery y/n? Default:',
        default: 'y'
      }];

      this.prompt(prompts, function (answer) {

        this.includeJQuery = answer.includeJQuery.toLowerCase() === 'y';

        done();

      }.bind(this));
    }
  },

  writing: {
    app: function () {

      var context = {   
        appName: this.appName, 
        appAbbr: this.appAbbr, 
        fullAppName: this.fullAppName,
        angularModules: this.angularModules
      };

      var buildContext = this.bowerComps;
      buildContext['includeBootstrap'] = this.includeBootstrap;
      buildContext['includeJQuery'] = this.includeJQuery;
      buildContext['includeIonic'] = this.includeIonic;
      buildContext['includeModernizr'] = this.includeModernizr;
      buildContext['appName'] = this.fullAppName;
      buildContext['appAbbr'] = this.appAbbr;

      this.dest.mkdir('gulp');
      this.dest.mkdir('app');
      this.dest.mkdir('app/js');
      this.dest.mkdir('app/js/controllers');
      this.dest.mkdir('app/css');
      this.dest.mkdir('app/templates');
      this.dest.mkdir('app/images');
      this.dest.mkdir('app/fonts');

      this.src.copy('_tests.js', 'gulp/tests.js');
      this.src.copy('_styles/main.scss', 'app/css/main.scss');
      this.src.copy('_templates/about.html', 'app/templates/about.html');
      this.src.copy('_images/yeoman.png', 'app/images/yeoman.png');
      this.src.copy('_images/livingdots.ico', 'app/images/livingdots.ico');
      this.src.copy('_images/livinglogobig.png', 'app/images/livinglogobig.png');
      this.src.copy('_404.html', 'app/404.html');

      this.template('_gulpfile.js', 'gulpfile.js', context);
      this.template('_build.js', 'gulp/build.js', buildContext);
      this.template("_scripts/app.js", "app/js/app.js", context);
      this.template("_scripts/controllers/about.js", "app/js/controllers/about.js", context);
      this.template("_scripts/controllers/main.js", "app/js/controllers/main.js", context);
      this.template("_index.html", "app/index.html", context);
      this.template('_templates/main.html', 'app/templates/main.html', buildContext);
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
    }
  },

  end: function () {
    if (this.includeBootstrap) {
      console.log(chalk.bold.blue('\n\nBootstrap needs jQuery, so I\'m gonna go ahead and load that too\n'));
    }

    console.log(chalk.bold.bgRed('\n\nRemember to add \"require(\'./apps/' + this.appName + '/gulpfile.js\');\" to living-frontend/gulpfile.js \n'));
    this.installDependencies();

  }
});

module.exports = LivingappGenerator;
