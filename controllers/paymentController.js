const stripe = require("stripe")("sk_test_51NyFnbSItGzs2jnU6fKCppJcYRhn56TPxH5Vth8qhsIkJkIITi4JDwciPtdUtyftVrL58c0t8IszIroRtlvaRJoM003IxRdRF8");

// Controller logic for payment routes
export const createPaymentIntent = async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send("Internal Server Error");
  }
};


