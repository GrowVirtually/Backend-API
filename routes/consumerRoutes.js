const express = require('express');

const { makeReview } = require('../route_handlers/consumerHandler');

const router = express.Router();

// routes
// router.route('/').post(createGig).get(getAllGigs);
router.route('/review').post(makeReview);

module.exports = router;
