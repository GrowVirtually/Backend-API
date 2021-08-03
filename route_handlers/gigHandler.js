const Gig = require('../models/Gig');
const Location = require('../models/Location');
const catchAsync = require('../utils/catchAsync');
const sequelize = require('../models/db');
const AppError = require('../utils/appError');
const { QueryTypes } = require('sequelize');

exports.createGig = catchAsync(async (req, res, next) => {
  // start the transaction
  const t = await sequelize.transaction();

  try {
    // add gig details to the table
    let newGig = await Gig.create(
      {
        gigType: req.body.gigType,
        gigCategory: req.body.gigCategory,
        gigTitle: req.body.gigTitle,
        gigDescription: req.body.gigDescription,
        minOrderAmount: req.body.minOrderAmount,
        unit: req.body.unit,
        unitPrice: req.body.unitPrice,
        stock: req.body.stock,
        sold: req.body.sold,
        gigDuration: Date.now(),
        userid: 1,
      },
      {
        transaction: t,
      }
    );

    newGig = await newGig.save();

    // add locations to the table
    await Promise.all(
      req.body.locations.map(async (location) => {
        await Location.create(
          {
            coordinates: sequelize.fn(
              'ST_MakePoint',
              location.lat,
              location.lng
            ),
            gigId: newGig.gigId,
          },
          {
            transaction: t,
          }
        );
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

exports.getAllGigs = catchAsync(async (req, res, next) => {
  const query = `SELECT "Gigs".*
                 FROM (SELECT DISTINCT "gigId"
                       FROM (SELECT "gigId"
                             FROM "Locations"
                             WHERE ST_DWithin(coordinates,
                                              ST_MakePoint(${req.body.location.lat}, ${req.body.location.lng})::geography,
                                              ${req.body.distance})
                             ORDER BY coordinates <-> ST_MakePoint(${req.body.location.lat}, ${req.body.location.lng})::geography
                             LIMIT ${req.body.limit}) AS nearGigIds) AS distinctGigIds
                          INNER JOIN "Gigs"
                                     ON distinctGigIds."gigId" = "Gigs"."gigId" `;

  const gigs = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  res.status(201).json({
    status: 'success',
    data: {
      gigs,
    },
  });
});

exports.setLocation = catchAsync(async (req, res, next) => {
  const newLocation = await Location.create({
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
