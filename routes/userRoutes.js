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
const { getMe, getUser, updateUser } = require('../route_handlers/userHandler');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/test', protect, restrictTo('admin', 'user'), sample);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.post('/sendOTP', sendOTP);
router.post('/verifyOTP', verifyOTP);

router.use(protect); // protect all the routes after this middleware
router.route('/me').get(getMe, getUser).patch(getMe, updateUser);

router.patch('/updateMyPassword', updatePassword);

module.exports = router;
