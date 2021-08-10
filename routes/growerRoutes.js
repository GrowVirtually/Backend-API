const express = require('express');

const { myReviews } = require('../route_handlers/growerHandler');

const router = express.Router();

// routes
// router.route('/').post(createGig).get(getAllGigs);
router.route('/reviews/:id').get(myReviews);

module.exports = router;
