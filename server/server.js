
/**
 * Module dependencies
 */

var express = require('express'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  routes_static_pages = require('./routes/static_pages'),
  routes_api = require('./routes/api'),
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
app.use(express.cookieSession());                           // Store the session in the (secret) cookie
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

// Users Resource route
app.get('/api/users', routes_api.get_users);
app.get('/api/users/:id', routes_api.get_user);
app.post('/api/users', routes_api.post_user);
app.put('/api/users/:id', routes_api.put_user);
app.del('/api/users/:id', routes_api.del_user);

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
