'use strict';

// Declare app level module which depends on filters, and services

angular.module('objectify', ['objectify.users', 'objectify.static_pages', 'objectify.filters', 'objectify.services', 'objectify.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'static_pages/home',
        controller: 'HomeCtrl'
      })
      .when('/users/index', {
        templateUrl: '/users/index',
        controller: 'UserControllerIndex'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);
