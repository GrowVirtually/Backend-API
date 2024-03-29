const express = require('express');

const {
  myReviews,
  getMyGigs,
  toDeliver,
  completed,
  getConsumer,
} = require('../route_handlers/growerHandler');
const { getMe } = require('../route_handlers/userHandler');
const { protect, restrictTo } = require('../route_handlers/authHandler');

const router = express.Router();
router.use(protect);
router.use(restrictTo('user', 'admin'));

// routes
router.route('/:id/reviews').get(myReviews);
router.route('/:id/gigs').get(getMyGigs);
router.route('/orders/toDeliver').get(getMe, toDeliver);
router.route('/orders/completed').get(getMe, completed);
router.route('/consumers/:consumerId').get(getConsumer);

module.exports = router;
