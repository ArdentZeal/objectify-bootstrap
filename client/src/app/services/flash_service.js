'use strict';

angular.module('objectify.flash', [])

.factory('alertService', function($rootScope) {
  var alertService = {};

  // create an array of alerts available globally
  $rootScope.alerts = [];

  // if location changes, delete all flashes
  /*$rootScope.$on("$locationChangeStart", function (event, next, current) {
    $rootScope.alerts.forEach(function(alert) {
      alertService.closeAlert(alert);
    });
  });*/

  alertService.add = function(type, msg) {
    $rootScope.alerts.push({'type': type, 'msg': msg, close: function() {
      alertService.closeAlert(this);
    } });
  };

  alertService.closeAlert = function(alert) {
    var index = $rootScope.alerts.indexOf(alert);
    $rootScope.alerts.splice(index, 1);
  };

  return alertService;
});