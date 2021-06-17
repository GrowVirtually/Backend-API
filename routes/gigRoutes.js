const express = require('express');
const { createGig, viewGigs } = require('../route_handlers/gigHandler');

const router = express.Router();

router.route('/add').post(createGig).get(viewGigs);

module.exports = router;
