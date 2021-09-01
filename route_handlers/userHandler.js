const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const db = require('../models');

exports.getMe = (req, res, next) => {
  req.params.userId = req.user.dataValues.id;
  next();
};

exports.getUser = catchAsync(async (req, res, next) => {
  if (!req.params.userId) {
    return next(new AppError('Values are missing', 400));
  }

  const user = await db.User.findByPk(req.params.userId, {
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
