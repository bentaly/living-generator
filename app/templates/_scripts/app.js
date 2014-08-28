'use strict';

/**
 * @ngdoc overview
 * @name <%= appName %>
 * @description
 * # <%= appName %>
 *
 * Main module of the application.
 */
angular
  .module('<%= appName %>', [<%= angularModules %>])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'templates/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
