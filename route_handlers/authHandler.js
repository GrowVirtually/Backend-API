const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const smsKey = process.env.SMS_SECRET_KEY;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const { oneUser } = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const refreshTokens = [];

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// mobile authentication
exports.sendOTP = catchAsync(async (req, res, next) => {
  const { phone } = req.body;

  if (!phone) {
    return next(new AppError('Phone number missing', 400));
  }

  const otp = Math.floor(1000 + Math.random() * 9000);
  const ttl = 2 * 60 * 1000;
  const expires = Date.now() + ttl;
  const data = `${phone}.${otp}.${expires}`;
  const hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');

  const fullHash = `${hash}.${expires}`;

  client.messages
    .create({
      body: `Your one time login password for 'GROVI' is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    })
    .then((message) => {
      console.log(message);
      res.status(200).json({
        status: 'success',
        phone,
        hash: fullHash,
        otp,
      });
    })
    .catch((err) => next(new AppError(err.message, err.status)));
});

exports.verifyOTP = catchAsync(async (req, res, next) => {
  const { phone, hash, otp } = req.body;
  const [hashValue, expires] = hash.split('.');

  if (!phone) {
    return next(new AppError('Please provide phone number', 400));
  }

  const now = Date.now();
  if (now > parseInt(expires, 10)) {
    return next(new AppError('OTP expired', 504));
  }

  const data = `${phone}.${otp}.${expires}`;
  const newCalculatedHash = crypto
    .createHmac('sha256', smsKey)
    .update(data)
    .digest('hex');

  if (newCalculatedHash !== hashValue) {
    return next(new AppError('Incorrect OTP', 400));
  }

  // if validation is done, search for user in the database
  const user = await oneUser(req); // db call

  console.log(!!user);

  if (user) {
    // if user found immediately authenticate him
    const token = signToken(phone);
    return res.status(200).json({
      status: 'success',
      userFound: true,
      token,
      ...user,
    });
  }

  // user not found, switched to signup process, requesting signup details
  return res.status(200).json({
    status: 'success',
    userFound: false,
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    fName: req.body.fName,
    lName: req.body.lName,
    tel: req.body.tel,
    dob: req.body.dob,
    nic: req.body.nic,
    email: req.body.email,
    gender: req.body.gender,
    address: {
      street: req.body.address.street,
      city: req.body.address.city,
      postalCode: req.body.address.postalCode,
    },
    pwd: req.body.pwd,
    pwdConfirm: req.body.pwdConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

// const authenticateUser = async (req, res, next) => {
//   const { accessToken } = req.cookies;
//
//   jwt.verify(accessToken, process.env.JWT_SECRET, async (err, phone) => {
//     if (phone) {
//       req.phone = phone;
//       next();
//     } else if (err.message === 'TokenExpiredError') {
//       return new AppError('Access token expired', 403);
//     } else {
//       console.error(err);
//       return new AppError('User not authenticated', 403);
//     }
//   });
// };

exports.refresh = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken)
    return new AppError('Refresh token not found, please log in again', 403);
  if (!refreshTokens.includes(refreshToken))
    return new AppError('Refresh token blocked, login again', 403);

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECET, (err, phone) => {
    if (err) {
      return new AppError('Invalid refresh token', 403);
    }

    const accessToken = jwt.sign({ data: phone }, process.env.JWT_SECRET, {
      expiresIn: '30s',
    });
    res
      .status(202)
      .cookie('accessToken', accessToken, {
        expires: new Date(new Date().getTime() + 30 * 1000),
        sameSite: 'strict',
        httpOnly: true,
      })
      .cookie('authSession', true, {
        expires: new Date(new Date().getTime() + 30 * 1000),
      })
      .json({
        status: 'success',
        previousSessionExpiry: true,
      });
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { tel, pwd } = req.body;

  // check telephone and pwd exits
  if (!tel || !pwd) {
    return next(new AppError('Please provide telephone and password', 400));
  }

  // check if the user exists and pwd is correct
  const user = await User.findOne({ tel }).select('+pwd');
  console.log(user); // does it need all the details?

  if (!user || !(await user.correctPwd(pwd, user.pwd))) {
    return next(new AppError('Incorrect telephone or password', 401));
  }

  // if everything ok, send the token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  res
    .clearCookie('refreshToken')
    .clearCookie('accessToken')
    .clearCookie('authSession')
    .clearCookie('refreshTokenId')
    .json({
      status: 'success',
    });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there

  // 2) Verification token

  // 3) Check if user if exists

  // 4) Check user changes password after token was issued

  next();
});
