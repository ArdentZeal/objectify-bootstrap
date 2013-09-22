'use strict';

// Declare app level module which depends on filters, and services

angular.module('objectify', ['objectify.users', 'objectify.static_pages', 'ui.bootstrap'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: '/static_pages/home.html',
        controller: 'HomeCtrl'
      })
      .when('/users/index', {
        templateUrl: '/users/index.html',
        controller: 'UserControllerIndex'
      })
      .when('/users/new', {
        templateUrl: '/users/new.html',
        controller: 'UserControllerNew'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
