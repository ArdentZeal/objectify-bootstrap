/*
 * Serve JSON to our AngularJS client
 */

 var UserProvider2 = require('./UserProvider2');

exports.name = function (req, res) {
  res.json({
  	name: 'Matthias'
  });
};

exports.users = function (req, res) {
	UserProvider2.userModel.find( function(error,users){
		if(error) { console.log(error) }
        	res.json( {users: users });
        });
};