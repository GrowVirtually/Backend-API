const express = require('express');
const {
  createGig,
  viewGigs,
  test,
  allUsers,
} = require('../route_handlers/gigHandler');

const router = express.Router();

router.route('/add').post(createGig).get(viewGigs);
router.route('/test').get(test);
router.route('/allUsers').get(allUsers);

module.exports = router;
