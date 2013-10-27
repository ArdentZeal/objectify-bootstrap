'use strict';

/* Users Module */

angular.module('objectify.objects', ['objectify.resource_service', 'objectify.delete_confirmation', 'ui.bootstrap', 'objectify.flash'])

  /*.controller('AddressControllerIndex', function ($scope, Addresses, $modal, alertService) {
    
    function fetchAllAddresses() {
      var promise = Addresses.query().$promise;
      promise.then(function(data) {
        $scope.addresses = data;
      });

      promise.catch(function(error) {
        alertService.add("danger", error);
      });
    }

    function openConfirmationDialog(a) {
      var popup = $modal.open({
        templateUrl: "/shared/delete_confirmation.html",
        controller: "DeleteConfirmationCtrl",
        resolve: {
          toDelete: function() {
            return a.street + " " + a.number;
          }
        }
      })

      popup.result.then(function() {
        // ok pressed, delete User
        deleteAddress(a);
      });
      popup.result.catch(function () {
        // nothing to do, if we dismiss the popup
      });
    }

    function deleteAddress(address) {
        address.$delete();
      alertService.add("success", "Deleted address " + address.street + " " + address.number + "!");
      // after delete, get updated users from db
      fetchAllAddresses();
    }

    function scb(data, headers) {
      var address = data;
      openConfirmationDialog(address);
    }

    function ecb(response) {
      console.log(response);
    }
    
    fetchAllAddresses();

    $scope.delete = function(id) {
      // we have to wait for the callback here, because we can only delete an entry when we retrieved its id
      var promise = Addresses.get( { id: id } ).$promise;
      promise.then(scb);
      promise.catch(ecb);
    };
  })*/

  .controller("ObjectControllerNew", function ($scope, Objects, $location, $route, alertService) {

    function scb(data) {
      // successCB
      //$location.path("/addresses/index");
      alertService.add("success", "Object successfully created!");
    }

    function ecb(error) {
      // errorCB
      $alertService.add("danger", error);
    }

    $scope.create = function(object) {
      var newObject = new Object(object);
      var promise = newObject.$save();
      promise.then(scb, ecb);
    };
  });

  /*.controller("AddressControllerEdit", function ($scope, Addresses, $routeParams, $location, alertService) {

    // show old values
    var promise = Addresses.get( { id: $routeParams.id } ).$promise;
    promise.then(function(data) {
      $scope.address = data;
    });

    function scb(data) {
      // successCB
      $location.path("/addresses/index");
      alertService.add("success", "Address " + data.street + " " + data.number +" successfully updated!");
    }

    function ecb(error) {
      // errorCB
      alertService.add("danger", error);
    }
    
    $scope.edit = function() {
     var promise = Addresses.update( { id: $scope.address._id }, { address: $scope.address }).$promise;
     promise.then(scb, ecb);
    };
  })

  .controller('AddressControllerShow', function ($scope, $routeParams, Addresses) {
    var promise = Addresses.get( { id: $routeParams.id } ).$promise;
    promise.then(function(data) {
      $scope.address = data;
    });
  });*/
