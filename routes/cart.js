import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addToCart, getCart, removeFromCart, updateQuantity } from "../controllers/cartController.js";

const router = express.Router();

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add a product to the user's cart
 *     tags:
 *       - Cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - name
 *               - price
 *               - quantity
 *               - image
 *               - category
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64f8f0a1c5b4e0d3a1234567
 *               name:
 *                 type: string
 *                 example: Cool Sneakers
 *               price:
 *                 type: string
 *                 example: $50
 *               quantity:
 *                 type: integer
 *                 example: 1
 *               image:
 *                 type: string
 *                 example: /images/product1.png
 *               category:
 *                 type: string
 *                 example: Trending
 *     responses:
 *       200:
 *         description: Product added successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *     security:
 *       - cookieAuth: []
 */
router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.post("/remove", authMiddleware, removeFromCart);
// routes/cart.js
router.post("/update", authMiddleware, async (req, res) => {
  try {
    const { productId, delta } = req.body;
    const user = req.user; // set by authMiddleware

    const cartItem = user.cart.find(item => item.productId === productId);
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
