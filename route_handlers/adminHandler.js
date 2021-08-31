const { Op } = require('sequelize');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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

  res.status(201).json({
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

  res.status(201).json({
    status: 'success',
    data: {
      users,
    },
  });
});
