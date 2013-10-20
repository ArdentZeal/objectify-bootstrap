/*
 * Serve JSON to our AngularJS client
 */

var Address = require('../models/Address'),
    User = require('../models/User');

exports.all = function (req, res) {
	Address.find().populate("user").exec(function(error, addresses){
		if(error) { 
      console.log(error);
      res.json(500, error); 
    }

    res.json(200, addresses);
  });
};

exports.show = function (req, res) {
  Address.findById(req.params.id).populate("user").exec(function(error, address) {
    if(error) { 
      console.log(error);
      res.json(500, error); 
    }

    res.json(200, address);
  })
};

exports.create = function (req, res) {
  Address.create({ street: req.body.street, number: req.body.number, zip: req.body.zip, city: req.body.city, country: req.body.country, user:req.user._id },
    function(error, address) {
      if(error) { 
        console.log(error);
        res.json(500, error); 
      }

      User.findById(req.user._id, function(error, user) {
         if(error) {
             res.json(500, error);
         }

         user.addresses.push(address._id);
         user.save();
      });

      res.send(201, address);
    });
};

exports.update = function (req, res) {
  Address.findById(req.params.id, function(error, address) {
  if(error) { console.log(error) }
    address.street = req.body.address.street;
    address.number = req.body.address.number;
    address.zip = req.body.address.zip;
    address.city = req.body.address.city;
    address.country = req.body.address.country;
    address.save(function(error) {
      if(error) { 
        console.log(error);
        res.json(500, error); 
      } 
      
      res.send(202, address);
    })
  })
};

exports.del = function (req, res) {
    User.findById(req.user._id, function(error, user) {
        if(error) {
            res.json(500, error);
        }
        var index = user.addresses.indexOf(req.params.id);
        user.addresses.splice(index, 1);
    });

  Address.remove({ _id: req.params.id }, function(error, address) {
    if(error) { 
      console.log(error);
      res.json(500, error); 
    }

    res.send(200);
  })
};