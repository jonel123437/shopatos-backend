import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: String, required: true },       // keep as string to match '$49.99' format
  subtitle: { type: String },
  image: { type: String },
  category: { type: String },
});

export default mongoose.model('Product', productSchema);
