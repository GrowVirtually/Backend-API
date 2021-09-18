const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const db = require('../models');

exports.makeReview = catchAsync(async (req, res, next) => {
  if (!req.body.content || !req.body.consumerId || !req.body.growerId) {
    return next(new AppError('Values are missing', 400));
  }

  const newReview = await db.Review.create({
    content: req.body.content,
    consumerId: req.body.consumerId,
    growerId: req.body.growerId,
  });

  await newReview.save();

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});

exports.completeOrder = catchAsync(async (req, res, next) => {
  if (!req.params.userId || !req.body.orderId) {
    return next(new AppError('Missing values', 400));
  }

  const result = await db.Order.update(
    {
      isConsumerCompleted: true,
      isOrderCompleted: true,
    },
    {
      where: {
        consumerId: req.params.userId,
        id: req.body.orderId,
      },
      returning: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      result,
    },
  });
});

exports.toAccept = catchAsync(async (req, res, next) => {
  if (!req.params.userId) {
    return next(new AppError('Missing values', 400));
  }

  const orders = await db.Order.findAll({
    where: {
      consumerId: req.params.userId,
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

exports.toDeliver = catchAsync(async (req, res, next) => {
  if (!req.params.userId) {
    return next(new AppError('Missing values', 400));
  }

  const orders = await db.Order.findAll({
    where: {
      consumerId: req.params.userId,
      isOrderCompleted: false,
      isGrowerAccepted: true,
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

exports.delivered = catchAsync(async (req, res, next) => {
  if (!req.params.userId) {
    return next(new AppError('Missing values', 400));
  }

  const orders = await db.Order.findAll({
    where: {
      consumerId: req.params.userId,
      isOrderCompleted: false,
      isGrowerAccepted: true,
      isConsumerCompleted: false,
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

exports.completed = catchAsync(async (req, res, next) => {
  if (!req.params.userId) {
    return next(new AppError('Missing values', 400));
  }

  const orders = await db.Order.findAll({
    where: {
      consumerId: req.params.userId,
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
