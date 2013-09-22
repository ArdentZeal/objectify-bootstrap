"use strict";

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/objectify');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Successfully connected to MongoDB");
});

function getUserSchema() {

	return mongoose.Schema({
    name: String,
    username: String,
    password: String
	})
}

function getUserModel() {
	return mongoose.model('User', getUserSchema());
}

exports.userModel = getUserModel();

