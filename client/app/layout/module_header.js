angular.module('objectify.header', ['objectify.authentication'])
 
  .controller('HeaderController', function ($scope, authentication) {
    
    authentication.requestCurrentUser();
    $scope.isAuthenticated = authentication.isAuthenticated;
    $scope.$watch(function() {
      return authentication.currentUser;
    }, function(currentUser) {
      $scope.user = currentUser;
    });

    $scope.logout = function() {
      authentication.logout();
    };
  });