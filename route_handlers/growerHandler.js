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

  res.status(201).json({
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
  });

  res.status(201).json({
    status: 'success',
    data: {
      gigs: gigs,
    },
  });
});
