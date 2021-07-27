const express = require('express');
const { protect } = require('../route_handlers/authHandler');

const {
  test,
  allUsers,
  oneUser,
  createUser,
} = require('../route_handlers/gigHandler');

const { signUpValidate, errorHandle } = require('../utils/validations');

const router = express.Router();

// routes
router.route('/test').get(test);
router.route('/allUsers').get(allUsers);
router.route('/oneUser/:id').get(protect, oneUser);
router.route('/createUser').post(signUpValidate, errorHandle, createUser);

module.exports = router;
