import User from "../models/User.js";
import Order from "../models/Order.js";

// Add product to cart
export const addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { productId, name, price, quantity, image, category } = req.body;

    const existingIndex = user.cart.findIndex(item => item.productId.toString() === productId);
    if (existingIndex >= 0) user.cart[existingIndex].quantity += quantity;
    else user.cart.push({ productId, name, price, quantity, image, category });

    await user.save();
    res.status(200).json({ success: true, cart: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get current cart
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove product
export const removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { productId } = req.body;

    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();
    res.status(200).json({ success: true, cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update quantity
export const updateQuantity = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { productId, quantity } = req.body;

    const item = user.cart.find(item => item.productId.toString() === productId);
    if (item) item.quantity = quantity;

    await user.save();
    res.status(200).json({ success: true, cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Create order after checkout
export const createOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { paymentIntentId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.cart || user.cart.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const totalAmount = user.cart.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );

    const order = await Order.create({
      userId,
      items: user.cart,
      totalAmount,
      paymentIntentId,
      paymentStatus: "paid", // update with webhook for real scenario
    });

    // Clear user's cart
    user.cart = [];
    await user.save();

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create order" });
  }
};

// GET /api/orders
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("Get User Orders Error:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch orders." });
  }
};