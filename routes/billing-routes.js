const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const requireAuth = require('../middlewares/requireAuth');

module.exports = (app) => {
  app.post('/api/stripe', requireAuth, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 email credits',
      source: req.body.id,
    });

    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
