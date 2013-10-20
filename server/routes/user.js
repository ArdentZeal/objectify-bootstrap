/*
 * Serve JSON to our AngularJS client
 */

 var User = require('../models/User');

exports.all = function (req, res) {
	User.find().populate("addresses").exec(function(error,users){
		if(error) { 
      console.log(error);
      res.json(500, error); 
    }

    res.json(200, users);
  });
};

exports.show = function (req, res) {
  User.findById(req.params.id).populate("addresses").exec(function(error, user) {
    if(error) { 
      console.log(error);
      res.json(500, error); 
    }

    res.json( user );
  })
};

exports.create = function (req, res) {
  User.create({ firstname: req.body.firstname, lastname: req.body.lastname, username: req.body.username, email: req.body.email, password: req.body.password },
    function(error, user) {
      if(error) { 
        console.log(error);
        res.json(500, error); 
      }

      res.send(201, user);
    });
};

exports.update = function (req, res) {
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

exports.del = function (req, res) {
  User.remove({ _id: req.params.id }, function(error) {
    if(error) { 
      console.log(error);
      res.json(500, error); 
    }
    res.send(200);
  })
};

exports.myaddresses = function(req, res) {
    User.findById(req.user._id).populate("addresses").exec(function(error, user) {
        if(error) {
            res.json(500, error);
        }

        res.send(200, user);
    });
};