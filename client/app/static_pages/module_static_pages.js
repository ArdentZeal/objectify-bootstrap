angular.module('objectify.static_pages', [])
 
  .controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('/api/name').
      success(function(data, status, headers, config) {
        $scope.name = data.name;
      });

  }]);