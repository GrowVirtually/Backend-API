const express = require('express');
const {
  signup,
  userLogin,
  sendOTP,
  verifyOTP,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
} = require('../route_handlers/authHandler');
const {
  getMe,
  getUser,
  updateUser,
  updateProfilePic,
} = require('../route_handlers/userHandler');
const { getSavedGigs } = require('../route_handlers/gigHandler');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', userLogin);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.post('/sendOTP', sendOTP);
router.post('/verifyOTP', verifyOTP);

router.use(protect); // protect all the routes after this middleware
router.route('/me').get(getMe, getUser).patch(getMe, updateUser);
router.route('/me/saved').get(getMe, getSavedGigs);
router.route('/me/picture').patch(getMe, updateProfilePic);

router.patch('/updateMyPassword', updatePassword);

module.exports = router;
