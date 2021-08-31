const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const db = require('../models');

exports.getMe = catchAsync(async (req, res, next) => {
  if (!req.body.userId) {
    return next(new AppError('Values are missing', 400));
  }

  const user = await db.User.findByPk(req.body.userId, {
    attributes: {
      exclude: [
        'password',
        'passwordChangedAt',
        'passwordResetToken',
        'passwordResetExpires',
        'createdAt',
        'updatedAt',
      ],
    },
  });

  res.status(201).json({
    status: 'success',
    data: {
      profile: user,
    },
  });
});
