import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminUser.js";

export const adminAuthMiddleware = async (req, res, next) => {
  const token = req.cookies.adminToken;

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    const admin = await AdminUser.findById(decoded.id);
    if (!admin) return res.status(401).json({ message: "Not authenticated" });

    req.admin = admin; // attach admin to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authenticated" });
  }
};
