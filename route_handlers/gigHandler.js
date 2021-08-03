const Gig = require('../models/Gig');
const Location = require('../models/Location');
const catchAsync = require('../utils/catchAsync');

exports.createGig = catchAsync(async (req, res, next) => {
  const newGig = await Gig.create({
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
  });

  await newGig.save();

  res.status(201).json({
    status: 'success',
    data: {
      user: newGig,
    },
  });
});

exports.getAllGigs = catchAsync(async (req, res, next) => {
  const result = await Gig.findAll();

  res.status(201).json({
    status: 'success',
    data: {
      gigs: result,
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
