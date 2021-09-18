const express = require('express');

const {
  makeReview,
  completeOrder,
  toAccept,
  toDeliver,
  delivered,
  completed,
} = require('../route_handlers/consumerHandler');
const { getMe } = require('../route_handlers/userHandler');
const { protect, restrictTo } = require('../route_handlers/authHandler');

const router = express.Router();

// routes
router.use(protect);
// router.route('/').post(createGig).get(getAllGigs);
router.route('/review').post(makeReview);
router.route('/orders/complete').patch(getMe, completeOrder);
router.route('/orders/toAccept').get(getMe, toAccept);
router.route('/orders/toDeliver').get(getMe, toDeliver);
router.route('/orders/delivered').get(getMe, delivered);
router.route('/orders/completed').get(getMe, completed);

module.exports = router;
