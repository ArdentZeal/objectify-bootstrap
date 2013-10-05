'use strict';

angular.module('objectify.resource_service', ['ngResource'])

  .factory('Users', function ($resource) {
    var Users = $resource('http://localhost\\:3000/api/users/:id', 
      { id:'@_id' }, 
      { update: { method: "PUT" } });

    Users.prototype.update = function(scb, ecb) {
      return Users.update({ 
        id: this.id
      }, angular.extend({}, this, {
        _id: undefined
      }), scb, ecb);
    };

    return Users;

  });