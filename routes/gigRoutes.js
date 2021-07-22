const express = require('express');
const {
  test,
  allUsers,
  oneUser,
  getOne,
} = require('../route_handlers/gigHandler');

const { signUpValidate, errorHandle } = require('../utils/validations');

const router = express.Router();

// routes
router.route('/test').get(test);
router.route('/allUsers').get(allUsers);
router.route('/oneUser/:id').get(oneUser);
// router.route('/createUser').post(signUpValidate, errorHandle, createUser);
router.route('/getOne').get(getOne);

module.exports = router;
