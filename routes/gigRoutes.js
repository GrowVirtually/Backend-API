const express = require('express');
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
router.route('/oneUser/:id').get(oneUser);
router.route('/createUser').post(signUpValidate, errorHandle, createUser);

module.exports = router;
