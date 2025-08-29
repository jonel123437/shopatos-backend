import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");
    const result = await User.updateMany({}, { $set: { cart: [] } });
    console.log("Users updated:", result.modifiedCount);
    process.exit();
  })
  .catch(err => console.error(err));
