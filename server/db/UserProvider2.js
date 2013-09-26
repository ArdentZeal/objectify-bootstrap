"use strict";

var dbConnection = require('../db/connection'),
  bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;


var userSchema = dbConnection.mongoose.Schema({
  name: String,
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true}
});

// Bcrypt middleware
/*userSchema.pre('save', function(next) {
  var user = this;

  if(!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});*/

// Password verification
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    cb(err, isMatch);
  });
};

var userModel = dbConnection.mongoose.model('User', userSchema);

exports.userModel = userModel;

