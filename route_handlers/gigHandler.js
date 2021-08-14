const { QueryTypes, Op } = require('sequelize');
const cloudinary = require('cloudinary');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const db = require('../models');

exports.createGig = catchAsync(async (req, res, next) => {
  // start the transaction

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

  const t = await db.sequelize.transaction();

  try {
    // add gig details to the table
    let newGig = await db.Gig.create(
      {
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
        userid,
      },
      {
        transaction: t,
      }
    );

    newGig = await newGig.save();

    // add locations to the table
    await Promise.all(
      req.body.locations.map(async (location) => {
        const newLocation = await db.Location.create(
          {
            coordinates: db.sequelize.fn(
              'ST_MakePoint',
              location.lat,
              location.lng
            ),
            gigid: newGig.dataValues.id,
          },
          {
            transaction: t,
          }
        );
        await newLocation.save();
      })
    );

    await t.commit();

    res.status(201).json({
      status: 'success',
      data: {
        user: newGig,
      },
    });
  } catch (error) {
    await t.rollback();
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
  console.log(req.query);
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

  const locations = await db.Location.findAll({
    // attributes: [
    //   [db.sequelize.fn('distinct', db.sequelize.col('gigid')), 'gigid'],
    // ],
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    // group: ['gigid', 'Location.id'],
    where: db.sequelize.where(
      db.sequelize.fn(
        'filter_by_distance',
        db.sequelize.col('coordinates'),
        location.lat,
        location.lng,
        distance
      ),
      true
    ),
    order: [
      [
        db.sequelize.fn(
          'sort_by_location',
          db.sequelize.col('coordinates'),
          location.lat,
          location.lng
        ),
      ],
    ],
    offset: offset,
    limit: limit,
    include: [
      {
        model: db.Gig,
        as: 'gig',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        where: db.sequelize.where(
          db.sequelize.fn('date', db.sequelize.col('expireDate')),
          '>',
          today
        ),
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
                as: 'customers',
                attributes: {
                  exclude: ['userid', 'createdAt', 'updatedAt'],
                },
                include: [
                  {
                    model: db.Grower,
                    as: 'growers',
                    attributes: {
                      exclude: ['userid', 'createdAt', 'updatedAt'],
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  locations.sort(
    (loc1, loc2) =>
      loc2.dataValues.gig.user.customers[0].growers[0].dataValues.points * 1 -
      loc1.dataValues.gig.user.customers[0].growers[0].dataValues.points * 1
  );

  res.status(200).json({
    status: 'success',
    results: locations.length,
    data: {
      locations,
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
            as: 'customers',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
              {
                model: db.Grower,
                as: 'growers',
                attributes: ['growerType'],
              },
            ],
          },
        ],
      },
      {
        model: db.Location,
        as: 'locations',
        where: {
          id: req.params.locationId,
        },
        attributes: ['coordinates'],
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
