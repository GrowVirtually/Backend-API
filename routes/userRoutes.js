const express = require('express');
const {
  signup,
  login,
  sendOTP,
  verifyOTP,
  forgotPassword,
} = require('../route_handlers/authHandler');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', login);
router.post('/sendOTP', sendOTP);
router.post('/verifyOTP', verifyOTP);

module.exports = router;
