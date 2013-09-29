'use strict';

// Declare app level module 

angular.module('objectify', ['objectify.users', 'objectify.static_pages', 'objectify.header', 'ui.bootstrap', 'ngRoute', 'objectify.authentication'])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: '/static_pages/home.html',
        controller: 'HomeController'
      })
      .when('/users/index', {
        templateUrl: '/users/index.html',
        controller: 'UserControllerIndex'
      })
      .when('/users/new', {
        templateUrl: '/users/new.html',
        controller: 'UserControllerNew'
      })
      .when('/users/edit/:id', {
        templateUrl: '/users/edit.html',
        controller: 'UserControllerEdit'
      })
      .when('/users/show/:id', {
        templateUrl: '/users/show.html',
        controller: 'UserControllerShow'
      })
      .when('/users/login', {
        templateUrl: '/users/login.html',
        controller: 'UserControllerLogin'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .run(function(authentication) {
    authentication.requestCurrentUser();
  });
