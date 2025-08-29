import User from "../models/User.js";

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
