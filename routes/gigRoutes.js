const express = require('express');

const {
  createGig,
  getAllGigs,
  setLocation,
} = require('../route_handlers/gigHandler');

const router = express.Router();

// routes
router.route('/').post(createGig).get(getAllGigs);
router.route('/setLocation').post(setLocation); // for location model testing

module.exports = router;
