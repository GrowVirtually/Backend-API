const express = require('express');

const { myReviews, getMyGigs } = require('../route_handlers/growerHandler');
const { protect, restrictTo } = require('../route_handlers/authHandler');

const router = express.Router();
// router.use(protect);
// router.use(restrictTo('user'));

// routes
router.route('/reviews/:id').get(myReviews);
router.route('/gigs/:id').get(getMyGigs);

module.exports = router;
