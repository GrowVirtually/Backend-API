const express = require('express');
const { protect } = require('../route_handlers/authHandler');
const {
  getCheckoutSession,
  createOrderCheckout,
} = require('../route_handlers/bookingHandler');

const router = express.Router();
// router.use(protect);

router.get('/checkout-session/:gigId/:units', protect, getCheckoutSession);
router.get('/order-checkout', createOrderCheckout);
module.exports = router;
