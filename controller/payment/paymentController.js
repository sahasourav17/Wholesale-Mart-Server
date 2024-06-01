const Order = require("../../models/orderSchema");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPayment = async (req, res) => {
  const { token, shippingInfo, cartItems, user } = req.body;

  // Calculate total amount in cents
  const totalAmount =
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0) *
    100;

  try {
    // Use the Stripe token to create a charge
    const charge = await stripe.charges.create({
      amount: totalAmount,
      currency: "usd",
      source: token.id,
      description: "Example Charge",
    });

    if (!charge.id) {
      return res
        .status(500)
        .json({ error: "Payment processing failed. No charge ID returned." });
    }

    // Save order information to MongoDB
    const order = new Order({
      user: user._id,
      transactionId: charge.id,
      items: cartItems,
      totalAmount: totalAmount / 100, // Convert back to dollars for saving
      shippingInfo: shippingInfo,
    });
    const savedOrder = await order.save();

    if (!savedOrder) {
      return res
        .status(500)
        .json({ error: "Failed to save order to the database." });
    }

    res.status(200).json({ success: true, charge });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred during payment processing.",
      details: err.message,
    });
  }
};

module.exports = {
  createPayment,
};
