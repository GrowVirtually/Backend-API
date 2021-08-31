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
router.route('/').post(createGig);
router.route('/:lnglat').get(getAllGigs);
router.route('/:gigId').get(getSingleGig);
router.route('/upload').post(uploadImg); // testing for img upload

module.exports = router;
