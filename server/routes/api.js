/*
 * Serve JSON to our AngularJS client
 */

 var UserProvider2 = require('./UserProvider2');

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
  UserProvider2.userModel.create({ name: req.body.name, username: req.body.username, password: req.body.password },
    function(error, user) {
      if(error) { console.log(error) }
        
    });
};

exports.put_user = function (req, res) {
  UserProvider2.userModel.findById(req.params.id, function(error, user) {
  if(error) { console.log(error) }
    user.name = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;
    user.save(function(error) {
      if (error) { console.log(error); }
    })
  })
};

exports.del_user = function (req, res) {
  UserProvider2.userModel.remove({ _id: req.params.id }, function(error) {
    if (error) { console.log(error); }
  })
};