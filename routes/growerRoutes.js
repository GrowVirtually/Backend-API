const express = require('express');

const { myReviews, getMyGigs } = require('../route_handlers/growerHandler');

const router = express.Router();

// routes
// router.route('/').post(createGig).get(getAllGigs);
router.route('/reviews/:id').get(myReviews);
router.route('/gigs/:id').get(getMyGigs);

module.exports = router;
