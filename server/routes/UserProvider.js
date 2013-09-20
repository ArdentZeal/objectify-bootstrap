"use strict";

var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

var UserProvider = function(host, port) {
  this.db = new Db('test', new Server(host, port, {auto_reconnect: true}), {safe: true});
  this.db.open(function(error, db) {
  if(error) {
    console.log(error);
  } else {
    console.log("connected to mongod with no problems...");
  }
  });
};


UserProvider.prototype.getCollection = function(callback) {
  this.db.collection('users', function(error, user_collection) {
    if( error ) callback(error);
    else callback(null, user_collection);
  });
};

UserProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, user_collection) {
      if( error ) callback(error)
      else {
        user_collection.find().toArray(function(error, results) {
          console.dir(results);
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};


UserProvider.prototype.findById = function(id, callback) {
    this.getCollection(function(error, user_collection) {
      if( error ) callback(error)
      else {
        user_collection.findOne({_id: new ObjectID(id)}, function(error, result) {
          if( error ) callback(error)
          else callback(null, result)
        });
      }
    });
};

UserProvider.prototype.save = function(users, callback) {
    this.getCollection(function(error, user_collection) {
      if( error ) callback(error)
      else {
        if( typeof(users.length)=="undefined")
          users = [users];

        for( var i =0;i< users.length;i++ ) {
          user = users[i];
          user.created_at = new Date();
        }

        article_collection.insert(users, function() {
          callback(null, users);
        });
      }
    });
};

exports.UserProvider = UserProvider;