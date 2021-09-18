const express = require('express');

const {
  createGig,
  getAllGigs,
  uploadImg,
  getSingleGig,
  searchGigs,
  getTitles,
} = require('../route_handlers/gigHandler');

const { protect } = require('../route_handlers/authHandler');

const router = express.Router();

router.use(protect);

// routes
router.route('/').post(createGig);
router.route('/all/:lnglat').get(getAllGigs);
router.route('/titles/:title').get(getTitles);
router.route('/search/:title').get(searchGigs);
router.route('/:gigId').get(getSingleGig);
router.route('/upload').post(uploadImg); // testing for img upload

module.exports = router;
