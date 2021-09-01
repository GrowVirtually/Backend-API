const express = require('express');

const {
  createGig,
  getAllGigs,
  uploadImg,
  getSingleGig,
} = require('../route_handlers/gigHandler');

const { protect } = require('../route_handlers/authHandler');

const router = express.Router();

// router.use(protect);

// routes
router.route('/').post(createGig);
router.route('/:lnglat').get(getAllGigs);
router.route('/:gigId').get(getSingleGig);
router.route('/upload').post(uploadImg); // testing for img upload

module.exports = router;
