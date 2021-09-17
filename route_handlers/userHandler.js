const cloudinary = require('cloudinary');
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

  res.status(200).json({
    status: 'success',
    data: {
      profile: user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  if (!req.params.userId) {
    return next(new AppError('Values are missing', 400));
  }

  const result = await db.User.update(
    {
      fname: req.body.fname,
      lname: req.body.lname,
      phone: req.body.phone,
      dob: req.body.dob,
      nic: req.body.nic,
      email: req.body.email,
      gender: req.body.gender,
    },
    {
      where: {
        id: req.params.userId,
      },
      returning: true,
    }
  );

  const user = result[1][0];

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateProfilePic = catchAsync(async (req, res, next) => {
  if (!req.params.userId) {
    return next(new AppError('Values are missing', 400));
  }

  const link = await db.User.findByPk(req.params.userId, {
    attributes: ['imgLink'],
  });

  if (link.dataValues.imgLink !== null && link.dataValues.imgLink !== '') {
    const publicId = link.dataValues.imgLink
      .split('/')
      .slice(-1)[0]
      .split('.')[0];
    cloudinary.uploader.destroy(publicId, (result) => {
      if (result.error) {
        return next(new AppError(result.error.message, 400));
      }
    });
  }

  let imgLink = '';
  if (req.files.img && req.files.img.originalFilename) {
    const img = await cloudinary.uploader.upload(
      req.files.img.path,
      (result) => {
        if (result.error) {
          return next(new AppError('Error uploading photo', 400));
        }
      }
    );
    imgLink = img.url;
  }

  const result = await db.User.update(
    {
      imgLink,
    },
    {
      where: {
        id: req.params.userId,
      },
      returning: true,
    }
  );

  const user = result[1][0];

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
