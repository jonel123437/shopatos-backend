import mongoose from "mongoose";
import dotenv from "dotenv";
import AdminUser from "./models/AdminUser.js"; // path to your AdminUser model

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existingAdmin = await AdminUser.findOne({ email: "admin1@example.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    // Create admin — DO NOT manually hash password, pre-save hook will hash
    const admin = await AdminUser.create({
      name: "Jonel Admin",
      email: "admin1@example.com",
      password: "Password123!", // plaintext, will be hashed automatically
      role: "superadmin",
    });

    console.log("Admin user seeded successfully:", admin.email);
    process.exit();
  } catch (err) {
    console.error("Error seeding admin:", err);
    process.exit(1);
  }
};

seedAdmin();
