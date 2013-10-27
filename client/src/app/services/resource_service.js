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
  })

    .factory('Addresses', function ($resource) {
        var Addresses = $resource('http://localhost\\:3000/api/addresses/:id',
            { id:'@_id' },
            { update: { method: "PUT" } });

        Addresses.prototype.update = function(scb, ecb) {
            return Addresses.update({
                id: this.id
            }, angular.extend({}, this, {
                _id: undefined
            }), scb, ecb);
        };

        return Addresses;
    })

    .factory('Objects', function ($resource) {
        var Objects = $resource('http://localhost\\:3000/api/objects/:id',
            { id:'@_id' },
            { update: { method: "PUT" } });

        Objects.prototype.update = function(scb, ecb) {
            return Objects.update({
                id: this.id
            }, angular.extend({}, this, {
                _id: undefined
            }), scb, ecb);
        };

        return Objects;
    });