const express = require('express');

const {
  myReviews,
  getMyGigs,
  toDeliver,
  completed,
} = require('../route_handlers/growerHandler');
const { getMe } = require('../route_handlers/userHandler');
const { protect, restrictTo } = require('../route_handlers/authHandler');

const router = express.Router();
router.use(protect);
router.use(restrictTo('user'));

// routes
router.route('/:id/reviews').get(myReviews);
router.route('/:id/gigs').get(getMyGigs);
router.route('/orders/toDeliver').get(getMe, toDeliver);
router.route('/orders/completed').get(getMe, completed);

module.exports = router;
