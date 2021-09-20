const express = require('express');
const { getMe } = require('../route_handlers/userHandler');
const {
  createGig,
  getAllGigs,
  uploadImg,
  getSingleGig,
  deleteGig,
  getTitles,
} = require('../route_handlers/gigHandler');

const { protect } = require('../route_handlers/authHandler');

const router = express.Router();

router.use(protect);

// routes
router.route('/').post(createGig);
router.route('/all/:lnglat').get(getAllGigs);
router.route('/titles').get(getTitles);
router.route('/:gigId').get(getSingleGig).delete(getMe, deleteGig);
router.route('/upload').post(uploadImg); // testing for img upload

module.exports = router;
