'use strict';

/* Users Module */

angular.module('objectify.users', [])
  
  .controller('UserControllerIndex', ['$scope', '$http', function ($scope, $http) {
    $http.get('/api/users').
      success(function(data, status, headers, config) {
        $scope.users = data.users;
      });

  }]);