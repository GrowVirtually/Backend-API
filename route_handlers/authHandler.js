const jwt = require('jsonwebtoken');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
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
