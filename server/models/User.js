"use strict";

var mongoose = require('mongoose'), 
  bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;

var UserSchema = mongoose.Schema({
  name:  String,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  //salt:       String
  /*hash:       String,
  facebook:{
    id:       String,
    email:    String,
    name:     String
  },
  twitter:{
    id:       String,
    email:    String,
    name:     String
  }*/
});

// Bcrypt middleware
UserSchema.pre('save', function(next) {
  var user = this;
  //if(!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Password verification
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    cb(err, isMatch);
  });
};

var User = mongoose.model("User", UserSchema);
module.exports = User;

