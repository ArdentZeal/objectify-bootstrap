"use strict";

/**
 * Module dependencies
 */

var express = require('express'),
  mongoose = require('mongoose'),
  SessionStore = require("session-mongoose")(express),
  passport = require('passport'),
  routes_user = require('./routes/user'),
  routes_address = require('./routes/address'),
  http = require('http'),
  path = require('path'),
  passconfig = require('./passport/pass'),
  auth = require('./passport/authentication');

var app = module.exports = express();


/**
 * Configuration
 */

 // db
 var env = process.env.NODE_ENV || 'development',
  config = require('./config')[env];


mongoose.connect(config.db, config.mongoOptions, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + config.db + '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + config.db);
  }
});

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.cookieParser("super_secret"));  // Hash cookies with this secret              

var store = new SessionStore({
    url: "mongodb://localhost/session",
    interval: 120000 // expiration check worker run interval in millisec (default: 60000)
});
app.use(express.session({
    store: store,
    cookie: { maxAge: 100*60*60*60*24*30 } // expire session in 30 days
})); 
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, '..', 'client', 'app')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};

/**
 * Routes
 */

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { 
      return next(err);
    }
    if (!user) { 
      return next(new Error("User not found"));
    } 
    req.logIn(user, function(err) {
      if (err) { 
      return next(err);
    }
      return res.json(202, user);
    });
  })(req, res, next);
});

app.post('/logout', auth.logout);

app.get('/currentuser', auth.sendCurrentUser);

// FACEBOOK
//==========
//
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook', { scope: "email" }));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', passport.authenticate('facebook'), function(req, res, next) {
  res.redirect("/users/index");
});

// Users resource routes
app.get('/api/users', routes_user.all);
app.get('/api/users/:id', routes_user.show);
app.post('/api/users', routes_user.create);
app.put('/api/users/:id', routes_user.update);
app.del('/api/users/:id', routes_user.del);

// Address resource routes
app.get('/api/addresses', routes_address.all);
app.get('/api/addresses/:id', routes_address.show);
app.post('/api/addresses', routes_address.create);
app.put('/api/addresses/:id', routes_address.update);
app.del('/api/addresses/:id', routes_address.del);

app.get('/api/myaddresses', routes_user.myaddresses);

// New Object
app.post('/api/objects', function(req, res, next) {
 console.log(req.body.object.modelname);
 // TODO
 // create schema
 // create object
 // check if schema already is there
});


// redirect all others to the index (HTML5 history)
app.all('/*', function(req, res) {
  res.sendfile(path.join(__dirname, '..', 'client', 'app', 'index.html'));
});

// A standard error handler - it picks up any left over errors and returns a nicely formatted server 500 error
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
