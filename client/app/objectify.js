'use strict';

// Declare app level module 

angular.module('objectify', ['objectify.objects_directive', 'objectify.users', 'objectify.static_pages', 'objectify.addresses', 'objectify.objects', 'objectify.header', 'ui.bootstrap', 'ngRoute', 'objectify.authentication'])
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
        .when('/myaddresses', {
            templateUrl: '/users/myaddresses.html',
            controller: 'UserControllerMyAddresses'
        })
        .when('/addresses/index', {
            templateUrl: '/addresses/index.html',
            controller: 'AddressControllerIndex'
        })
        .when('/addresses/new', {
            templateUrl: '/addresses/new.html',
            controller: 'AddressControllerNew'
        })
        .when('/addresses/edit/:id', {
            templateUrl: '/addresses/edit.html',
            controller: 'AddressControllerEdit'
        })
        .when('/addresses/show/:id', {
            templateUrl: '/addresses/show.html',
            controller: 'AddressControllerShow'
        })
        .when('/objects/new', {
            templateUrl: '/objects/new.html',
            controller: 'ObjectControllerNew'
        })
      .otherwise({
        redirectTo: '/'
      });
  })

  .run(function(authentication) {
    authentication.requestCurrentUser();
  });
