import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // no longer required
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  subtitle: { type: String }, // optional
});

// Auto-increment `id` before saving
productSchema.pre("save", async function (next) {
  if (this.isNew && (this.id === undefined || this.id === null)) {
    // Use the same model to find the last inserted product
    const lastProduct = await this.constructor.findOne().sort({ id: -1 }).exec();
    this.id = lastProduct ? lastProduct.id + 1 : 1;
  }
  next();
});

export default mongoose.model("Product", productSchema);
