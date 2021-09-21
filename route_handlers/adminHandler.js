const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

const db = require('../models');

exports.searchGigs = catchAsync(async (req, res, next) => {
  if (!req.params.param || !req.params.value) {
    return next(new AppError('Values are missing', 400));
  }

  const options = { model: db.User, as: 'user', where: {} };

  switch (req.params.param) {
    case 'nic':
      options.where = { nic: { [Op.iLike]: `%${req.params.value}` } };
      break;
    case 'phone':
      options.where.phone = req.params.value;
      break;
    case 'email':
      options.where.email = req.params.value;
      break;
    default:
      break;
  }

  const gigs = await db.Gig.findAll({
    include: [options],
  });

  res.status(200).json({
    status: 'success',
    data: {
      gigs,
    },
  });
});

exports.searchUsers = catchAsync(async (req, res, next) => {
  if (!req.params.param || !req.params.value) {
    return next(new AppError('Values are missing', 400));
  }

  const options = { where: {} };

  switch (req.params.param) {
    case 'nic':
      options.where = { nic: { [Op.iLike]: `%${req.params.value}` } };
      break;
    case 'phone':
      options.where.phone = req.params.value;
      break;
    case 'email':
      options.where.email = req.params.value;
      break;
    default:
      break;
  }

  const users = await db.User.findAll(options);

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.dashboardData = catchAsync(async (req, res, next) => {
  const gigCount = await db.Gig.count({});
  const userCount = await db.User.count({});
  const fruitCount = await db.Gig.count({ where: { gigCategory: 'fruit' } });
  const vegetableCount = await db.Gig.count({
    where: { gigCategory: 'vegetable' },
  });

  res.status(200).json({
    status: 'success',
    data: {
      gigCount,
      userCount,
      fruitCount,
      vegetableCount,
    },
  });
});

exports.addNew = catchAsync(async (req, res, next) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const newUser = await db.User.create({
    fname: req.body.fname,
    lname: req.body.lname,
    phone: req.body.phone,
    email: req.body.email,
    password: hashed,
  });

  await newUser.save();

  res.status(201).json({
    status: 'success',
    data: {
      newUser,
    },
  });
});
