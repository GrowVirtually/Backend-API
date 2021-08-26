const express = require('express');

const { searchGigs } = require('../route_handlers/adminHandler');
const { protect, restrictTo } = require('../route_handlers/authHandler');

const router = express.Router();
router.use(protect);
router.use(restrictTo('user')); // to be changed to  admin

// routes
router.route('/search/gigs/:param/:value').get(searchGigs);

module.exports = router;
