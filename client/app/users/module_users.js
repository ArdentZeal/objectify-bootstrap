'use strict';

/* Users Module */

angular.module('objectify.users', ['objectify.resource_service', 'objectify.delete_confirmation', 'ui.bootstrap'])

  .controller('UserControllerIndex', function ($scope, Users, $modal) {
    $scope.users = Users.query();

    $scope.delete = function(id) {
      // we have to wait for the callback here, because we can only delete an entry when we retrieved its id
      var user = Users.get( { id: id }, function() {
        //successCb
        // ask for delete confirmation
        var popup = $modal.open({
          templateUrl: "/shared/delete_confirmation.html",
          controller: "DeleteConfirmationCtrl",
          resolve: {
            user: function() {
              return user;
            }
          }
        });

        popup.result.then(function () {
          // ok pressed
          user.$delete();
          // after delete, get updated users from db
          $scope.users = Users.query();
        }, function () {
          // Cancel pressed
          // nothing to do
        });

      });
    };
  })

  .controller("UserControllerNew", function ($scope, Users, $location) {

    $scope.create = function(user) {
      var newUser = new Users({ name: user.name, username: user.username, password: user.password });
      newUser.$save();
      $location.path("/users/index");
    };
    
  })

  .controller("UserControllerEdit", function ($scope, Users, $routeParams, $location) {

    // show old values
    var user = Users.get( { id: $routeParams.id }, function() {
        // successCB
        $scope.user = user;
      });
    
    $scope.edit = function() {
        Users.update( user );
        $location.path("/users/index");
    };
    
  })

  .controller('UserControllerShow', function ($scope, $routeParams, Users) {
    var user = Users.get( { id: $routeParams.id } );
    $scope.user = user;
  });
