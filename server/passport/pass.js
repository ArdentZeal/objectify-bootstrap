var passport = require('passport'), 
LocalStrategy = require('passport-local').Strategy,
FacebookStrategy = require('passport-facebook').Strategy,
 User = require('../models/User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid password' });
      }
    });
  });
}));

var FACEBOOK_APP_ID = "439700699471786";
var FACEBOOK_APP_SECRET = "da047644c1e8920a86750cfc18f20b62";
var strat = new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    User.findOne({ facebookID: profile.id }, function(err, user) {
      if(err) { done(err); }
      if (!user) {
        User.create({ firstname: profile.name.givenName, lastname: profile.name.familyName, username: profile.username, email: profile.emails[0].value, facebookID: profile.id },
          function(err, user) {
            if(err) { done(err); }

            done(null, user);
          });
      }
      done(null, user);
    });
  });
passport.use(strat);

// Simple route middleware to ensure user is authenticated.  Otherwise send to login page.
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
};