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

  console.log(reviews);

  res.status(201).json({
    status: 'success',
    data: {
      reviews: reviews,
    },
  });
});
