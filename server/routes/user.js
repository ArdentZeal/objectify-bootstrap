/*
 * Serve JSON to our AngularJS client
 */

 var User = require('../models/User');

exports.get_users = function (req, res) {
	User.find( function(error,users){
		if(error) { 
      console.log(error);
      res.json(500, error); 
    }

    res.json(200, users);
  });
};

exports.get_user = function (req, res) {
  User.findById(req.params.id, function(error, user) {
    if(error) { 
      console.log(error);
      res.json(500, error); 
    }

    res.json( user );
  })
};

exports.post_user = function (req, res) {
  User.create({ firstname: req.body.firstname, lastname: req.body.lastname, username: req.body.username, email: req.body.email, password: req.body.password },
    function(error, user) {
      if(error) { 
        console.log(error);
        res.json(500, error); 
      }

      res.send(201, user);
    });
};

exports.put_user = function (req, res) {
  User.findById(req.params.id, function(error, user) {
  if(error) { console.log(error) }
    user.firstname = req.body.user.firstname;
    user.lastname = req.body.user.lastname;
    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.password = req.body.user.password;
    user.save(function(error) {
      if(error) { 
        console.log(error);
        res.json(500, error); 
      } 
      
      res.send(202, user);
    })
  })
};

exports.del_user = function (req, res) {
  User.remove({ _id: req.params.id }, function(error) {
    if(error) { 
      console.log(error);
      res.json(500, error); 
    }
    res.send(200);
  })
};