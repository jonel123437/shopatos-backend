import User from "../models/User.js";

export const getCurrentUser = async (req, res) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Not authenticated" });

    const user = await User.findById(req.userId).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
