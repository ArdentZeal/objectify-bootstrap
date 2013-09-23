'use strict';

/* Users Module */

angular.module('objectify.users', ['objectify.resource_service'])

  .controller('UserControllerIndex', function ($scope, Users) {
    $scope.users = Users.query();
  })

  .controller("UserControllerNew", function ($scope, Users, $location) {

    $scope.create = function(user) {
      var newUser = new Users({ name: user.name, username: user.username, password: user.password });
      newUser.$save();
      $location.path("/users/index");
    };
    
  })

  .controller('UserControllerShow', function ($scope, $routeParams, Users) {
    var user = Users.get( { id: $routeParams.id } );
    $scope.user = user;
  });