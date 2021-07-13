const express = require('express');
const { signup, sendOTP, verifyOTP } = require('../route_handlers/authHandler');

const router = express.Router();

router.post('/signup', signup);
// router.post('/login', login);
router.post('/sendOTP', sendOTP);
router.post('/verifyOTP', verifyOTP);

module.exports = router;
