var filterUser = function(user) {
  if ( user ) {
    return {
      user : {
        id: user._id,
        email: user.email,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        facebookID: user.facebookID
      }
    };
  } else {
    return { user: null };
  }
};

var authentication = {
  sendCurrentUser: function(req, res, next) {
    res.json(200, filterUser(req.user));
  },
  logout: function(req, res, next) {
    req.logout();
    res.send(202);
  }
};

module.exports = authentication;