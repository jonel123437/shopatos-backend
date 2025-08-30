import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addToCart, getCart, removeFromCart, updateQuantity } from "../controllers/cartController.js";
import User from "../models/User.js"; // your Mongoose User model

const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.post("/remove", authMiddleware, removeFromCart);
router.post("/update", authMiddleware, async (req, res) => {
  try {
    const { productId, delta } = req.body;
    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const cartItem = user.cart.find(
      item => item.productId.toString() === productId.toString()
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cartItem.quantity = Math.max(1, cartItem.quantity + delta);
    await user.save();

    res.json({ cart: user.cart });
  } catch (err) {
    console.error("Failed to update quantity:", err);
    res.status(500).json({ message: "Failed to update quantity." });
  }
});

export default router;
