"use strict";

var mongoose = require('mongoose'),
    User = require('../models/User');

var AddressSchema = mongoose.Schema({
  street:  { type: String, required: true },
  number: { type: String, required: true },
  zip: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

var Address = mongoose.model("Address", AddressSchema);
exports.Schema = AddressSchema;
module.exports = Address;

