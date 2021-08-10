const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const db = require('../models');

exports.makeReview = catchAsync(async (req, res, next) => {
  const newLocation = await db.Location.create({
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    gigId: 1,
  });

  await newLocation.save();

  res.status(201).json({
    status: 'success',
    data: {
      location: newLocation,
    },
  });
});
