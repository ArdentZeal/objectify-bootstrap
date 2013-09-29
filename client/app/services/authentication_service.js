angular.module('objectify.authentication', [])
  .factory('authentication', function($http, $q, $location) {
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
        $http.post('/logout').then(function() {
          authentication.currentUser = null;
          $location.path("/");
        });
      },

      login: function(loginData) {
        var promise = $http.post("/login", loginData);
        promise.then(function() {
          authentication.requestCurrentUser();
          $location.path("/");
        });

        promise.catch(function() {
          console.log("error logging in");
        });
      }
    }
    return authentication;
  });