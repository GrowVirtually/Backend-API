const express = require('express');
const {
  createGig,
  viewGigs,
  test,
  allUsers,
  oneUser,
  createUser,
} = require('../route_handlers/gigHandler');

const router = express.Router();

// router.route('/add').post(createGig).get(viewGigs);
router.route('/test').get(test);
router.route('/allUsers').get(allUsers);
router.route('/oneUser/:id').get(oneUser);
router.route('/createUser').post(createUser);

module.exports = router;
