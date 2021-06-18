// Load Idea Model
require('../models/Gig');
const mongoose = require('mongoose');

const Gig = mongoose.model('gigs');

exports.createGig = (req, res) => {
  console.log(req.body);

  const newGig = {
    type: req.body.type,
  };

  new Gig(newGig).save().then((gig) => {
    console.log(gig);
    res.send(gig);
  });
  // res.send('done');
};

exports.viewGigs = (req, res) => {
  console.log('These are gigs');
  res.status(201).send('these are gigs');
};
