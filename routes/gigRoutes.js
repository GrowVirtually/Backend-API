const express = require('express');

const { createGig, getAllGigs } = require('../route_handlers/gigHandler');

const router = express.Router();

// routes
router.route('/').post(createGig).get(getAllGigs);

module.exports = router;
