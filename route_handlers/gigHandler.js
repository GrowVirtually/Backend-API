const { Op } = require('sequelize');
const cloudinary = require('cloudinary');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const db = require('../models');

exports.createGig = catchAsync(async (req, res, next) => {
  const {
    gigType,
    gigCategory,
    gigTitle,
    gigDescription,
    minOrderAmount,
    unit,
    unitPrice,
    stock,
    sold,
    gigDuration,
    location,
    userid,
  } = req.body;

  if (
    !gigType ||
    !gigCategory ||
    !gigTitle ||
    !gigDescription ||
    !minOrderAmount ||
    !unit ||
    !unitPrice ||
    !stock ||
    !sold ||
    !gigDuration ||
    !userid
  ) {
    return next(new AppError('Some values missing', 400));
  }

  const currentDate = new Date();
  const expireDate = new Date(
    currentDate.setTime(currentDate.getTime() + gigDuration * 86400000)
  );

  try {
    // add gig details to the table
    let newGig = await db.Gig.create({
      gigType,
      gigCategory,
      gigTitle,
      gigDescription,
      minOrderAmount,
      unit,
      unitPrice,
      stock,
      sold,
      expireDate,
      coordinates: db.sequelize.fn('ST_MakePoint', location.lng, location.lat),
      userid,
    });

    newGig = await newGig.save();

    res.status(201).json({
      status: 'success',
      data: {
        user: newGig,
      },
    });
  } catch (error) {
    return next(new AppError('Transaction failed, data not inserted', 502));
  }
});

// to change the format of date object
const formatDate = (date) => {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
};

exports.getAllGigs = catchAsync(async (req, res, next) => {
  const { location, distance } = req.body;
  let { limit } = req.body;

  const { offset } = req.body;

  if (!location || !distance || typeof offset === 'undefined') {
    return next(new AppError('Some values missing', 400));
  }

  if (!location.lat || !location.lng) {
    return next(new AppError('Latitude or Longitude missing', 400));
  }

  if (!limit) {
    limit = 10;
  }

  const today = formatDate(new Date());

  // filters
  const { gigType, gigCategory, unit, unitPrice, deliveryAbility } = req.query;

  // sorting
  let { sort } = req.query;
  let sortOrder = 'ASC';

  if (sort[0] === '-') {
    sortOrder = 'DESC';
    sort = sort.substring(1);
  }

  const gigs = await db.Gig.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    where: {
      [Op.and]: [
        db.sequelize.where(
          db.sequelize.fn(
            'filter_by_distance',
            db.sequelize.col('coordinates'),
            location.lng,
            location.lat,
            distance
          ),
          true
        ),
        db.sequelize.where(
          db.sequelize.fn('date', db.sequelize.col('expireDate')),
          '>',
          today
        ),
        // filters
        gigType && { gigType },
        gigCategory && { gigCategory },
        unit && { unit },
        unitPrice &&
          unitPrice.gt && {
            unitPrice: {
              [Op.gt]: unitPrice.gt,
            },
          },
        unitPrice &&
          unitPrice.lt && {
            unitPrice: {
              [Op.lt]: unitPrice.lt,
            },
          },
        unitPrice &&
          unitPrice.gte && {
            unitPrice: {
              [Op.gte]: unitPrice.gte,
            },
          },
        unitPrice &&
          unitPrice.lte && {
            unitPrice: {
              [Op.lte]: unitPrice.lte,
            },
          },
        deliveryAbility && { deliveryAbility },
      ],
    },
    order: [
      sort
        ? [sort, sortOrder]
        : [
            db.sequelize.fn(
              'sort_by_location',
              db.sequelize.col('coordinates'),
              location.lng,
              location.lat
            ),
          ],
    ],
    offset: offset,
    limit: limit,
    include: [
      {
        model: db.User,
        as: 'user',
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
        include: [
          {
            model: db.Customer,
            as: 'customer',
            attributes: {
              exclude: ['userid', 'createdAt', 'updatedAt'],
            },
            include: [
              {
                model: db.Grower,
                as: 'grower',
                attributes: {
                  exclude: ['userid', 'createdAt', 'updatedAt'],
                },
              },
            ],
          },
        ],
      },
    ],
  });

  // gigs.sort(
  //   (loc1, loc2) =>
  //     loc2.dataValues.gig.user.customer.grower.points * 1 -
  //     loc1.dataValues.gig.user.customer.grower.points * 1
  // );

  res.status(200).json({
    status: 'success',
    results: gigs.length,
    data: {
      gigs,
    },
  });
});

exports.setLocation = catchAsync(async (req, res, next) => {
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

exports.uploadImg = catchAsync(async (req, res, next) => {
  cloudinary.uploader.upload(req.files.img.path, (result) => {
    if (result.error) {
      return next(new AppError('Error uploading photo', 400));
    }

    res.status(201).json({
      status: 'success',
      data: {
        link: result.url,
      },
    });
  });
});

exports.getSingleGig = catchAsync(async (req, res, next) => {
  const gig = await db.Gig.findByPk(req.params.gigId, {
    include: [
      {
        model: db.User,
        as: 'user',
        attributes: ['fname', 'lname'],
        include: [
          {
            model: db.Customer,
            as: 'customer',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
              {
                model: db.Grower,
                as: 'grower',
                attributes: ['growerType'],
              },
            ],
          },
        ],
      },
    ],
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  res.status(201).json({
    status: 'success',
    data: {
      gig: gig,
    },
  });
});
