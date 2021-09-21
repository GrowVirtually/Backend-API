const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const db = require('../models');

exports.myReviews = catchAsync(async (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError('ID is missing', 400));
  }

  const reviews = await db.Review.findAll({
    where: {
      growerId: req.params.id,
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      reviews: reviews,
    },
  });
});

exports.getMyGigs = catchAsync(async (req, res, next) => {
  const gigs = await db.Gig.findAll({
    where: { userid: req.params.id },
    include: [
      {
        model: db.GigImage,
        as: 'images',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    ],
    order: [['id', 'DESC']],
  });

  res.status(200).json({
    status: 'success',
    data: {
      gigs: gigs,
    },
  });
});

exports.toDeliver = catchAsync(async (req, res, next) => {
  if (!req.params.userId) {
    return next(new AppError('Missing values', 400));
  }

  const orders = await db.Order.findAll({
    where: {
      growerId: req.params.userId,
      isOrderCompleted: false,
      isGrowerAccepted: false,
      isConsumerCompleted: false,
      isGrowerCompleted: false,
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      orders,
    },
  });
});

exports.completed = catchAsync(async (req, res, next) => {
  if (!req.params.userId) {
    return next(new AppError('Missing values', 400));
  }

  const orders = await db.Order.findAll({
    where: {
      growerId: req.params.userId,
      isOrderCompleted: true,
      isGrowerAccepted: true,
      isConsumerCompleted: true,
      isGrowerCompleted: true,
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      orders,
    },
  });
});

exports.getConsumer = catchAsync(async (req, res, next) => {
  const consumer = await db.User.findByPk(req.params.consumerId, {});

  res.status(200).json({
    status: 'success',
    data: {
      consumer,
    },
  });
});
