const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req: any, res: any) => {
  const { cartItems } = req.body;

  const orderAmount = cartItems.reduce(
    (accumulator: number, current: { price: number; quantity: number }) =>
      accumulator + current.price * current.quantity,
    0
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: orderAmount,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
