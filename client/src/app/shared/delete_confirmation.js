angular.module('objectify.delete_confirmation', ['ui.bootstrap'])

  .controller("DeleteConfirmationCtrl", function ($scope, $modalInstance, toDelete) {

  $scope.toDelete = toDelete;

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
