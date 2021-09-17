const express = require('express');
const { protect } = require('../route_handlers/authHandler');
const { getCheckoutSession } = require('../route_handlers/bookingHandler');

const router = express.Router();

router.get('/checkout-session/:gigId/:units', protect, getCheckoutSession);

module.exports = router;
