/*
 * Serve JSON to our AngularJS client
 */

 var UserProvider2 = require('../db/UserProvider2');

exports.name = function (req, res) {
  res.json({
  	name: 'Matthias'
  });
};

exports.get_users = function (req, res) {
	UserProvider2.userModel.find( function(error,users){
		if(error) { console.log(error) }

    res.json( users );
  });
};

exports.get_user = function (req, res) {
  UserProvider2.userModel.findById(req.params.id, function(error, user) {
  if(error) { console.log(error) }

    res.json( user );
  })
};

exports.post_user = function (req, res) {
  UserProvider2.userModel.create({ name: req.body.name, username: req.body.username, email: req.body.email, password: req.body.password },
    function(error, user) {
      if(error) { console.log(error) }
      res.send(200);
    });
};

exports.put_user = function (req, res) {
  UserProvider2.userModel.findById(req.params.id, function(error, user) {
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
  UserProvider2.userModel.remove({ _id: req.params.id }, function(error) {
    if (error) { console.log(error); }
    res.send(200);
  })
};