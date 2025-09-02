import axios from "axios";

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    const response = await axios.post(
      "https://api.paymongo.com/v1/payment_intents",
      {
        data: {
          attributes: {
            amount: amount * 100, // PHP cents
            payment_method_allowed: ["card", "gcash"],
            currency: "PHP",
          },
        },
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY).toString("base64")}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("PayMongo Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
};
