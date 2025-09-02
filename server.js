import dotenv from "dotenv";
dotenv.config(); // must come first before all other imports

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";   
import productsRoute from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import adminRoutes from "./routes/admin.js";
import paymentRoutes from "./routes/payment.js";
import orderRoutes from "./routes/orderRoutes.js";

import { setupSwagger } from "./swagger.js";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

// Test route
app.get("/", (req, res) => res.send("API is running..."));

// Swagger docs
setupSwagger(app);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
