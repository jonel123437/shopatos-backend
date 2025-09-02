import mongoose from "mongoose";

const savedCardSchema = new mongoose.Schema({
  paymentMethodId: {
    type: String, // PayMongo payment_method_id
    required: true,
  },
  brand: {
    type: String, // e.g., "visa", "mastercard"
  },
  last4: {
    type: String, // last 4 digits
  },
  expMonth: {
    type: String,
  },
  expYear: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: String,
        quantity: Number,
        image: String,
        category: String,
      },
    ],
    savedCards: [savedCardSchema], // ✅ safe card storage
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
