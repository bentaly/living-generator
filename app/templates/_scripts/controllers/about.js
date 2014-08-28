'use strict';

/**
 * @ngdoc function
 * @name <%= appName %>.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the <%= appName %>
 */
angular.module('<%= appName %>')
  .controller('AboutCtrl', function ($scope, $rootScope) {
    $rootScope.activeLink = 'about';
  });
