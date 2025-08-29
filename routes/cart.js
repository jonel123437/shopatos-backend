import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addToCart, getCart, removeFromCart, updateQuantity } from "../controllers/cartController.js";
import User from "../models/User.js"; // your Mongoose User model

const router = express.Router();

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get the current user's cart
 *     tags:
 *       - Cart
 *     responses:
 *       200:
 *         description: User's cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CartItem'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *     security:
 *       - cookieAuth: []
 */


/**
 * @swagger
 * /api/cart/update:
 *   post:
 *     summary: Update the quantity of a product in the user's cart
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
 *               - delta
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64f8f0a1c5b4e0d3a1234567
 *               delta:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CartItem'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found in cart
 *       500:
 *         description: Server error
 *     security:
 *       - cookieAuth: []
 */


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
