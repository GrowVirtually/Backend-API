const Gig = require('../models/Gig');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/User');

exports.createGig = catchAsync(async (req, res, next) => {
  // await Gig.sync({ alter: true });
  const newGig = await Gig.create({
    gigType: req.body.gigType,
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
  const result = await User.findAll({ include: 'gigs' });
  console.log('result ------ ', result);
  res.status(201).json({
    status: 'success',
    data: {
      gigs: result,
    },
  });
});
