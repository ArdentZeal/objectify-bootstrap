var http = require('http'),
    mongoose = require('mongoose'),
    request = require('request'),
    User = require('../models/User');

describe("basic server test", function() {
  var force_synchron = false;

   it("ensure testing works", function() {
      expect(true).toBe(true);
   });

   // Simple get all users
   it("should get a positive response", function(done) {
     request("http://localhost:3000/api/users", function(error, response, body) {
        expect(response.statusCode).toBe(200);
        //expect(body.toContain(firstname)).toBe(true);
        done();
     });
   });

  // Post
  it("should create and delete a user", function() {
    runs(function() {
      var before_count = 0;
      var after_count = 0;
      var user_id = null;
      /*User.count({}, function(err, c) {
       before_count = c;
       });*/

      request({
        uri: "http://localhost:3000/api/users",
        method: "POST",
        form: {
          firstname: "John",
          lastname: "Doe",
          username: "JD",
          email: "jd@jd.de",
          password: "jd"
        }
      }, function(error, response, body) {
        expect(response.statusCode).toBe(201);
        user_id = response.data.user._id;
        /*User.count({}, function(err, c) {
         after_count = c;
         });*/
        //expect(after_count).toBe(before_count + 1);
        force_synchron = true;
        //done();
      });
    }, 5000);

    waitsFor(function() {
      return force_synchron;
    }, "User created", 5000);

    // delete created user
    runs(function() {
     User.findById(user_id, function(error, user) {
       expect(true).toBe(true);
       request({
       uri: "http://localhost:3000/api/users/" + user._id,
       method: "DELETE"
       }, function(error, response, body) {
       expect(response.statusCode).toBe(200);
       //expect(after_count).toBe(before_count + 1);
       });
     });
    }, 5000);
  });

});