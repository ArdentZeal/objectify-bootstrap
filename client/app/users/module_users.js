'use strict';

/* Users Module */

angular.module('objectify.users', ['objectify.resource_service', 'objectify.delete_confirmation', 'ui.bootstrap', 'objectify.authentication', 'objectify.flash'])

  .controller('UserControllerIndex', function ($scope, Users, $modal, alertService) {
    
    function fetchAllUsers() {
      var promise = Users.query().$promise;
      promise.then(function(data) {
        $scope.users = data;
      });

      promise.catch(function(error) {
        alertService.add("error", error);
      });
    }

    function openConfirmationDialog(u) {
      var popup = $modal.open({
        templateUrl: "/shared/delete_confirmation.html",
        controller: "DeleteConfirmationCtrl",
        resolve: {
          toDelete: function() {
            return u.name;
          }
        }
      })

      popup.result.then(function() {
        // ok pressed, delete User
        deleteUser(u);
      });
      popup.result.catch(function () {
        // nothing to do, if we dismiss the popup
      });
    }

    function deleteUser(user) {
      user.$delete();
      alertService.add("success", "Deleted user " + user.firstname + " " + user.lastname + "!");
      // after delete, get updated users from db
      fetchAllUsers();
    }

    function scb(data, headers) {
      var user = data;
      openConfirmationDialog(user);
    }

    function ecb(response) {
      console.log(response);
    }
    
    fetchAllUsers();

    $scope.delete = function(id) {
      // we have to wait for the callback here, because we can only delete an entry when we retrieved its id
      var promise = Users.get( { id: id } ).$promise;
      promise.then(scb);
      promise.catch(ecb);
    };
  })

  .controller("UserControllerNew", function ($scope, Users, $location, alertService) {

    function scb(data) {
      // successCB
      $location.path("/users/index");
      alertService.add("success", "User " + user.firstname + " " + user.lastname + " successfully created!");
    }

    function ecb(error) {
      // errorCB
      $alertService.add("error", error);
    }

    $scope.create = function(user) {
      var newUser = new Users({ firstname: user.firstname, lastname:user.lastname, username: user.username, email: user.email, password: user.password });
      var promise = newUser.$save();
      promise.then(scb, ecb);
    };
  })

  .controller("UserControllerEdit", function ($scope, Users, $routeParams, $location, alertService) {

    // show old values
    var promise = Users.get( { id: $routeParams.id } ).$promise;
    promise.then(function(data) {
      $scope.user = data;
    });

    function scb(data) {
      // successCB
      $location.path("/users/index");
      alertService.add("success", "User " + data.name + " successfully updated!");
    }

    function ecb(error) {
      // errorCB
      alertService.add("error", error);
    }
    
    $scope.edit = function() {
     var promise = Users.update( { id: $scope.user._id }, { user: $scope.user }).$promise; 
     promise.then(scb, ecb);
    };
  })

  .controller('UserControllerShow', function ($scope, $routeParams, Users) {
    var promise = Users.get( { id: $routeParams.id } ).$promise;
    promise.then(function(data) {
      $scope.user = data;
    });
  })

  .controller('UserControllerLogin', function ($scope, $http, $location, authentication) {
    $scope.login = function() {
      authentication.login({ username: $scope.login.username, password:$scope.login.password });
    };
  });
