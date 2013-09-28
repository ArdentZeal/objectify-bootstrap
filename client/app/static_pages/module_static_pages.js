angular.module('objectify.static_pages', [])
 
  .controller('HomeCtrl', function ($scope, $http) {

    $scope.name = "guest";
    $http.get("/currentuser").then(function(result) {
      if(result.data.user) {
        $scope.name = result.data.user.name;
      }
    });
  });