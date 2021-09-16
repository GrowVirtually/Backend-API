const express = require('express');
const { createOrder } = require('../route_handlers/orderHandler');

const router = express.Router();
router.post('/', createOrder);

module.exports = router;
