import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Product from '../models/Product.js';

const router = express.Router();

// --------------------- Multer setup ---------------------
const imageDir = path.join("..", "shopatos-frontend", "public", "images");
if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, imageDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// --------------------- GET all products ---------------------
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ id: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --------------------- GET product by ID ---------------------
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: parseInt(req.params.id) });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --------------------- POST new product ---------------------
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, category, price, subtitle } = req.body;
    const image = req.file ? `/images/${req.file.filename}` : null;

    const product = new Product({ name, category, price, image, subtitle });
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --------------------- PUT update product ---------------------
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const product = await Product.findOne({ id: parseInt(req.params.id) });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // If a new image is uploaded
    if (req.file) {
      // Delete the old image if it exists
      if (product.image) {
        const oldImagePath = path.join("..", "shopatos-frontend", "public", product.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error("Failed to delete old image:", err);
          });
        }
      }
      req.body.image = `/images/${req.file.filename}`;
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      { ...req.body },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --------------------- DELETE product ---------------------
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.image) {
      const imagePath = path.join("..", "shopatos-frontend", "public", product.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Failed to delete image file:", err);
      });
    }

    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
