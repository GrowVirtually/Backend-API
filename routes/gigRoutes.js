const express = require('express');

const {
  createGig,
  getAllGigs,
  setLocation,
  uploadImg,
  getSingleGig,
} = require('../route_handlers/gigHandler');

const router = express.Router();

// routes
router.route('/').post(createGig).get(getAllGigs);
router.route('/:id').get(getSingleGig);
router.route('/setLocation').post(setLocation); // for location model testing
router.route('/upload').post(uploadImg); // testing for img upload

module.exports = router;
