const express = require('express');
const {
  signup,
  login,
  sendOTP,
  verifyOTP,
  forgotPassword,
  resetPassword,
  sample,
  protect,
  restrictTo,
  updatePassword,
} = require('../route_handlers/authHandler');
const { getMe } = require('../route_handlers/userHandler');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/test', protect, restrictTo('admin', 'user'), sample);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.post('/sendOTP', sendOTP);
router.post('/verifyOTP', verifyOTP);

router.post('/me', getMe);

// protect all the routes after this middleware
router.use(protect);

router.patch('/updateMyPassword', updatePassword);

module.exports = router;
