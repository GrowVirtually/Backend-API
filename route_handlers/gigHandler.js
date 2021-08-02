const { Gig } = require('../models/Gig');
const catchAsync = require('../utils/catchAsync');

exports.createGig = catchAsync(async (req, res, next) => {
  const newGig = await Gig.create({
    gigType: req.body.gigType,
    gigTitle: req.body.gigTitle,
    gigDescription: req.body.gigDescription,
    minOrderAmount: req.body.minOrderAmount,
    unit: req.body.unit,
    unitPrice: req.body.unitPrice,
    stock: req.body.stock,
    sold: req.body.sold,
    gigDuration: req.body.gigDuration,
  });

  await newGig.save();

  res.status(201).json({
    status: 'success',
    data: {
      user: newGig,
    },
  });
});
