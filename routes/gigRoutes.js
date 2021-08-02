const express = require('express');

const { createGig } = require('../route_handlers/gigHandler');

const router = express.Router();

// routes
router.route('/').post(createGig);

module.exports = router;
