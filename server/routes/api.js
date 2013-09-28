/*
 * Serve JSON to our AngularJS client
 */

 var User = require('../models/User');

exports.name = function (req, res) {
  res.json({
  	name: 'Matthias'
  });
};

exports.get_users = function (req, res) {
	User.find( function(error,users){
		if(error) { console.log(error) }

    res.json( users );
  });
};

exports.get_user = function (req, res) {
  User.findById(req.params.id, function(error, user) {
  if(error) { console.log(error) }

    res.json( user );
  })
};

exports.post_user = function (req, res) {
  User.create({ name: req.body.name, username: req.body.username, email: req.body.email, password: req.body.password },
    function(error, user) {
      if(error) { console.log(error) }
      res.send(200);
    });
};

exports.put_user = function (req, res) {
  User.findById(req.params.id, function(error, user) {
  if(error) { console.log(error) }
    user.name = req.body.user.name;
    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.password = req.body.user.password;
    user.save(function(error) {
      if (error) { console.log(error); }
      res.send(200);
    })
  })
};

exports.del_user = function (req, res) {
  User.remove({ _id: req.params.id }, function(error) {
    if (error) { console.log(error); }
    res.send(200);
  })
};