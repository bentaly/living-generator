'use strict';

/**
 * @ngdoc function
 * @name <%= appName %>.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the <%= appName %>
 */
angular.module('<%= appName %>')
  .controller('MainCtrl', function ($scope, $rootScope) {
    $rootScope.activeLink = 'home';
  });
