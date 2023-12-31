const Sequelize = require('sequelize');
const db = require("../associations/clientAssociations");
const Op = Sequelize.Op;
const moment = require("moment");
const stripe = require('stripe')('sk_test_51O2Aj9Fpishfs76QdVWY9Xv7USEgijWgqsGBfhYxIKor5foxKi10miGLUvrh7WCAryFmWJbY2Qyr4IGfVBuUEXI800yxvkYnMq');

exports.createIntent = async(req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2023-08-16'}
  );
  console.log('Amount Here',req.body.amount)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseFloat(req.body.amount)*100,
    currency: 'usd',
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: 'pk_test_51O2Aj9Fpishfs76QRtWA5nW1r6zkdh3yEXdDMtDx6hSiehXQlqLV5kLJd55SEYOTnzJv6Be9kRMMpfFxnU4RxuGi00LLrv4W1W'
  });
};