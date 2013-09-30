angular.module('objectify.authentication', ['objectify.flash'])
  .factory('authentication', function($http, $q, $location, alertService) {
    var authentication = {
      // Information about the current user
      currentUser: null,

      requestCurrentUser: function() {
        if ( authentication.isAuthenticated() ) {
          return $q.when(authentication.currentUser);
        } else {
          return $http.get('/currentuser').then(function(response) {
            authentication.currentUser = response.data.user;
            return authentication.currentUser;
          });
        }
      },

      // Is the current user authenticated?
      isAuthenticated: function(){
        return !!authentication.currentUser;
      },

      logout: function() {
        var promise = $http.post('/logout')
        promise.then(function(response) {
          authentication.currentUser = null;
          alertService.add("success", "Logged out successfully");
          $location.path("/");
        });
        promise.catch(function(response) {
          alertService.add("danger", response.data.error.message);
        });
      },

      login: function(loginData) {
        var promise = $http.post("/login", loginData);
        promise.then(function(response) {
          authentication.currentUser = response.data;
          alertService.add("success", "Logged in successfully");
          $location.path("/");
        });

        promise.catch(function(response) {
          alertService.add("danger", response.data.error.message);
        });
      }
    }
    return authentication;
  });