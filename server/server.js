
/**
 * Module dependencies
 */

var express = require('express'),
  routes_static_pages = require('./routes/static_pages'),
  routes_users = require('./routes/users'),
  routes_api = require('./routes/api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
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

// JSON API - Database
app.get('/api/name', routes_api.name);
app.get('/api/users', routes_api.users);

// redirect all others to the index (HTML5 history)
app.all('/*', function(req, res) {
  console.log("catch");
  res.sendfile(path.join(__dirname, '..', 'client', 'app', 'index.html'));
});


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
