angular.module('objectify.static_pages', ['objectify.authentication'])
 
  .controller('HomeController', function ($scope, authentication) {
    $scope.$watch(function() {
      return authentication.currentUser;
    }, function(currentUser) {
      $scope.user = currentUser;
    });
  });