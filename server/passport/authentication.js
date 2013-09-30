var filterUser = function(user) {
  if ( user ) {
    return {
      user : {
        id: user._id,
        email: user.email,
        username: user.username,
        name: user.name
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