var mongoose = require('mongoose');

exports.mongoose = mongoose;

// Database connect
var uristring = 
  //process.env.MONGOLAB_URI || 
  //process.env.MONGOHQ_URL || 
  'mongodb://localhost/objectify';

var mongoOptions = { /*db: { safe: true }*/ };

mongoose.connect(uristring, mongoOptions, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + uristring);
  }
});