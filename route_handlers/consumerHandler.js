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
