const express = require('express');

const {
  createGig,
  getAllGigs,
  makeReview,
} = require('../route_handlers/gigHandler');

const router = express.Router();

// routes
router.route('/').post(createGig).get(getAllGigs);
router.route('/review').post(makeReview); // for location model testing

module.exports = router;
