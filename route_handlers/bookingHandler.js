const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const db = require('../models');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) get the currently paying gig
  const gig = await db.Gig.findByPk(req.params.gigId);

  // 2) create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/gigs/${
      req.params.gigId
    }`,
    mode: 'payment',
    cancel_url: `${req.protocol}://${req.get('host')}/gigs/${req.params.gigId}`,
    customer_email: req.user.email,
    client_reference_id: req.params.gigId,
    line_items: [
      {
        name: gig.gigTitle,
        description: gig.gigDescription,
        amount: gig.unitPrice * req.params.units * 100,
        currency: 'lkr',
        quantity: 1,
      },
    ],
  });

  // 3) create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});
