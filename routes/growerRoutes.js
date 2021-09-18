const express = require('express');

const {
  myReviews,
  getMyGigs,
  acceptOrder,
  completeOrder,
} = require('../route_handlers/growerHandler');
const { getMe } = require('../route_handlers/userHandler');
const { protect, restrictTo } = require('../route_handlers/authHandler');

const router = express.Router();
router.use(protect);
router.use(restrictTo('user'));

// routes
router.route('/:id/reviews').get(myReviews);
router.route('/:id/gigs').get(getMyGigs);
router.route('/orders/accept').patch(getMe, acceptOrder);
router.route('/orders/complete').patch(getMe, completeOrder);

module.exports = router;
