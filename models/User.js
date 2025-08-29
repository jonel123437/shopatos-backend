import mongoose from "mongoose";

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
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
