const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const db = require('../models');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { quantity, amount, growerId, consumerId } = req.body; // growerId replaced by gigId needs to be added

  if (!quantity || !amount || !growerId || !consumerId)
    return next(new AppError('Some values missing', 400));

  const newOrder = await db.Order.create({
    quantity,
    paymentAmount: amount,
    deliveryMethod: 'self',
    growerId,
    consumerId,
  });

  await newOrder.save();
});
