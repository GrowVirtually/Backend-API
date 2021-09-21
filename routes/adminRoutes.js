const express = require('express');

const {
  searchGigs,
  searchUsers,
  dashboardData,
  addNew,
  updateAdmin,
  removeAdmin,
} = require('../route_handlers/adminHandler');
const {
  protect,
  restrictTo,
  adminLogin,
  logout,
} = require('../route_handlers/authHandler');

const router = express.Router();

router.post('/login', adminLogin);
router.get('/logout', protect, restrictTo('admin'), logout);

router.use(protect);
// router.use(restrictTo('admin', 'user')); // to be changed to  admin

// routes
router.route('/search/gigs/:param/:value').get(searchGigs);
router.route('/search/users/:param/:value').get(searchUsers);
router.route('/dashboard').get(dashboardData);
router.route('/addNew').post(addNew);
router.route('/edit').patch(updateAdmin).delete(removeAdmin);

module.exports = router;
