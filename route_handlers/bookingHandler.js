const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const db = require('../models');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const { gigId, units } = req.params;

  // 1) get the currently paying gig
  const gig = await db.Gig.findByPk(gigId);

  // 2) create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get(
      'host'
    )}/api/v1/bookings/order-checkout?gigId=${gigId}&quantity=${units}&amount=${
      gig.unitPrice * units
    }&consumerId=${req.user.id}`,
    mode: 'payment',
    cancel_url: `${req.protocol}://${req.get('host')}/gigs/${gigId}`,
    customer_email: req.user.email,
    client_reference_id: gigId,
    line_items: [
      {
        name: gig.gigTitle,
        description: gig.gigDescription,
        amount: gig.unitPrice * 100,
        currency: 'lkr',
        quantity: units,
      },
    ],
  });

  // 3) create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.createOrderCheckout = catchAsync(async (req, res, next) => {
  const { quantity, amount, gigId, consumerId } = req.query; // growerId replaced by gigId needs to be added

  if (!quantity || !amount || !gigId || !consumerId)
    return next(new AppError('Some values missing', 400));

  const gigDetails = await db.Gig.findOne({
    attributes: ['userid', 'deliveryAbility'],
    where: {
      id: gigId,
    },
  });

  const newOrder = await db.Order.create({
    quantity,
    paymentAmount: amount,
    deliveryMethod: gigDetails.deliveryAbility ? 'seller' : 'self',
    growerId: gigDetails.userid,
    consumerId,
    gigId,
  });

  await newOrder.save();

  res.sendStatus(200);
});
