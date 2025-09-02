import User from "../models/User.js";

// ✅ Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Save a card
export const addSavedCard = async (req, res) => {
  try {
    const { paymentMethodId, brand, last4, expMonth, expYear } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const exists = user.savedCards.find(
      (card) => card.paymentMethodId === paymentMethodId
    );
    if (exists) {
      return res.status(400).json({ message: "Card already saved" });
    }

    user.savedCards.push({ paymentMethodId, brand, last4, expMonth, expYear });
    await user.save();

    res.status(201).json({
      message: "Card saved successfully",
      cards: user.savedCards,
    });
  } catch (err) {
    res.status(500).json({ message: "Error saving card" });
  }
};

// ✅ Remove a card
export const removeSavedCard = async (req, res) => {
  try {
    const { id } = req.params; // card document _id
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.savedCards = user.savedCards.filter(
      (card) => card._id.toString() !== id
    );
    await user.save();

    res.json({
      message: "Card removed successfully",
      cards: user.savedCards,
    });
  } catch (err) {
    res.status(500).json({ message: "Error removing card" });
  }
};

// ✅ Get all saved cards
export const getSavedCards = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("savedCards");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ cards: user.savedCards });
  } catch (err) {
    res.status(500).json({ message: "Error fetching cards" });
  }
};
