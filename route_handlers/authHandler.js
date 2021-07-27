const { promisify } = require('util');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const smsKey = process.env.SMS_SECRET_KEY;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const { oneUser, createUser } = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const refreshTokens = [];

const signToken = (phone) =>
  jwt.sign({ phone }, process.env.JWT_SECRET, {
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
  const user = await oneUser({ phone }); // db call

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
    phone,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check email and password exits
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // check if the user exists
  const user = await oneUser({ email });

  // check pwd is correct
  let passwordCorrect;
  if (user) {
    passwordCorrect = await bcrypt.compare(password, user.password);
  }

  if (!user || !passwordCorrect) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // if everything ok, send the token to client
  const token = signToken(user.tel);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      userid: user.userid,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
    },
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await createUser(req, res, next);

  const token = signToken(newUser.tel);

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
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user if exists
  const { phone } = decoded;
  const freshUser = await oneUser({ phone });
  if (!freshUser) {
    return next(
      new AppError('The user belongs to this token does no longer exists', 401)
    );
  }

  // 4) Check user changes password after token was issued
  // TODO: do this using schemas

  next();
});
