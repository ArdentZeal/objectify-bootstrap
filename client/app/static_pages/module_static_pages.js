angular.module('objectify.static_pages', ['objectify.authentication'])
 
  .controller('HomeController', function ($scope, authentication) {
    $scope.displayName = null;
    $scope.$watch(function() {
      return authentication.currentUser;
    }, function(currentUser) {
      $scope.displayName = currentUser.firstname + " " + currentUser.lastname;
    });
  });