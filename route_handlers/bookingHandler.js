const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const QRCode = require('qrcode');
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
    // success_url: `${req.protocol}://${req.get(
    //   'host'
    // )}/api/v1/bookings/order-checkout?gigId=${gigId}&quantity=${units}&amount=${
    //   gig.unitPrice * units
    // }&consumerId=${req.user.id}`,
    success_url: `${req.protocol}://${req.get('host')}`, // change this to my orders
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

const createOrderCheckout = async (session) => {
  const gigId = session.client_reference_id;
  const gigDetails = await db.Gig.findOne({
    attributes: ['userid', 'deliveryAbility'],
    where: {
      id: gigId,
    },
  });

  const consumerId = (
    await db.User.findOne({
      attributes: ['id'],
      where: {
        email: session.customer_email,
      },
    })
  ).id;

  const paymentAmount = session.amount_total / 100;
  const quantity = 1;

  let newOrder = await db.Order.create({
    quantity,
    paymentAmount,
    deliveryMethod: gigDetails.deliveryAbility ? 'seller' : 'self',
    growerId: gigDetails.userid,
    consumerId,
    gigId,
  });

  newOrder = await newOrder.save();

  const QRObject = {
    orderId: newOrder.id,
    paymentAmount: newOrder.paymentAmount,
  };

  const QRObjText = JSON.stringify(QRObject);

  let QRText;
  try {
    QRText = await QRCode.toDataURL(QRObjText);
  } catch (err) {
    console.error(err);
  }

  await db.Order.update(
    {
      qrLink: QRText,
    },
    {
      where: {
        id: newOrder.id,
      },
    }
  );
};

exports.webhookCheckout = catchAsync(async (req, res, next) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }
  if (event.type === 'checkout.session.completed')
    await createOrderCheckout(event.data.object);

  res.status(200).json({
    receive: true,
  });
});
