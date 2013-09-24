'use strict';

angular.module('objectify.resource_service', ['ngResource'])

  .factory('Users', function ($resource) {
    var Users = $resource('http://localhost\\:3000/api/users/:id', 
      { id:'@_id' }, 
      { update: { method: "PUT" } });
    return Users;

  });