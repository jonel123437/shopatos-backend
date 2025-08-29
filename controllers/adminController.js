import AdminUser from "../models/AdminUser.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Helper: create JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.ADMIN_JWT_SECRET, { expiresIn: "1d" });

export const registerAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingAdmin = await AdminUser.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    // Create new admin — password is plain text; pre-save hook will hash it
    const newAdmin = new AdminUser({ name, email, password, role });
    await newAdmin.save();

    res.status(201).json({
      message: "Admin created successfully",
      admin: { name: newAdmin.name, email: newAdmin.email, role: newAdmin.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Admin login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Debug logs
    console.log("req.body:", req.body);
    const admin = await AdminUser.findOne({ email: req.body.email });
    console.log("admin found:", admin);
    if (admin) {
    console.log("bcrypt compare result:", await bcrypt.compare(req.body.password, admin.password));
    }


    // Actual login logic
    if (!admin) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(admin._id);

    res
      .cookie("adminToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .status(200)
      .json({
        message: "Login successful",
        admin: { name: admin.name, email: admin.email, role: admin.role },
      });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Get current admin
export const getCurrentAdmin = async (req, res) => {
  if (!req.admin) return res.status(401).json({ message: "Not authenticated" });

  res.json({
    id: req.admin._id,
    name: req.admin.name,
    email: req.admin.email,
    role: req.admin.role,
  });
};

// Logout
export const logoutAdmin = async (req, res) => {
  res
    .cookie("adminToken", "", { httpOnly: true, expires: new Date(0), sameSite: "lax" })
    .status(200)
    .json({ message: "Logout successful" });
};
