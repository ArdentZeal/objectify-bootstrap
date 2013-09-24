angular.module('objectify.delete_confirmation', ['ui.bootstrap'])

  .controller("DeleteConfirmationCtrl", function ($scope, $modalInstance, user) {

  $scope.user = user;

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
