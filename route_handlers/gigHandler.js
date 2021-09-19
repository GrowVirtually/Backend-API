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
    coordinates: db.sequelize.fn('ST_MakePoint', location.lat, location.lng),
    userid,
  });

  newGig = await newGig.save();

  res.status(201).json({
    status: 'success',
    data: {
      user: newGig,
    },
  });
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
  const [lat, lng] = req.params.lnglat.split(',');

  if (!lat || !lng) {
    return next(new AppError('Latitude or Longitude missing', 400));
  }

  const today = formatDate(new Date());

  // filters
  const { gigType, gigCategory, unit, unitPrice, deliveryAbility, searchTag } =
    req.query;
  const distance = req.query.distance || 1000;

  // sorting
  let { sort } = req.query;
  let sortOrder = 'ASC';

  if (sort && sort[0] === '-') {
    sortOrder = 'DESC';
    sort = sort.substring(1);
  }

  // pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const offset = (page - 1) * limit;

  const gigs = await db.Gig.findAndCountAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    where: {
      [Op.and]: [
        db.sequelize.where(
          db.sequelize.fn(
            'filter_by_distance',
            db.sequelize.col('coordinates'),
            lat,
            lng,
            distance
          ),
          true
        ),
        // db.sequelize.where(    //TODO uncomment this function later
        //   db.sequelize.fn('date', db.sequelize.col('expireDate')),
        //   '>',
        //   today
        // ),
        // filters
        gigType && { gigType },
        searchTag && {
          gigTitle: {
            [Op.iLike]: `%${searchTag}%`,
          },
        },
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
              lat,
              lng
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
      {
        model: db.GigImage,
        as: 'images',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    ],
  });

  if (offset >= gigs.count) {
    return next(new AppError('Cannot fetch more results', 404));
  }

  // gigs.sort(
  //   (loc1, loc2) =>
  //     loc2.dataValues.gig.user.customer.grower.points * 1 -
  //     loc1.dataValues.gig.user.customer.grower.points * 1
  // );

  res.status(200).json({
    status: 'success',
    results: gigs.rows.length,
    data: {
      gigs: gigs.rows,
    },
  });
});

exports.uploadImg = catchAsync(async (req, res, next) => {
  if (!req.body.gigId) {
    return next(new AppError('Missing Values', 400));
  }

  cloudinary.uploader.upload(req.files.img.path, (result) => {
    if (result.error) {
      return next(new AppError('Error uploading photo', 400));
    }

    db.GigImage.create({
      gigId: req.body.gigId,
      imgLink: result.url,
    }).then((value) => {
      value.save();
    });

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
      {
        model: db.GigImage,
        as: 'images',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    ],
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  res.status(200).json({
    status: 'success',
    data: {
      gig: gig,
    },
  });
});

exports.getSavedGigs = catchAsync(async (req, res, next) => {
  const savedGigs = await db.User.findAll({
    attributes: {
      exclude: [
        'fname',
        'lname',
        'phone',
        'dob',
        'nic',
        'email',
        'gender',
        'imgLink',
        'role',
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
        model: db.Gig,
        as: 'savedGigs',
        through: {
          attributes: [],
        },
      },
    ],
    where: {
      id: req.params.userId,
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      savedGigs,
    },
  });
});

exports.addToSaved = catchAsync(async (req, res, next) => {});

exports.getTitles = catchAsync(async (req, res, next) => {
  const gigs = await db.Gig.findAll({
    attributes: ['gigTitle'],
  });

  res.status(200).json({
    status: 'success',
    data: {
      gigs: gigs,
    },
  });
});
