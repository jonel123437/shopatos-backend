import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Import routes
import authRoutes from "./routes/auth.js";   
import productsRoute from "./routes/products.js";
import cartRoutes from "./routes/cart.js";

// Swagger
import { setupSwagger } from "./swagger.js";

dotenv.config();

const app = express();

// Middleware — must be **before routes**
app.use(cors({
  origin: "http://localhost:3000", // your frontend URL
  credentials: true                // allow cookies
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoute);
app.use("/api/cart", cartRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Swagger docs
setupSwagger(app);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
