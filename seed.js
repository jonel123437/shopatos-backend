import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
  { id: 1, name: 'Shinobu Sneakers - Demon Slayer™', price: '$49.99', subtitle: 'Short description', image: '/images/image1.png', category: 'All' },
  { id: 2, name: 'Sneakers Mitsuri Kanroji - Demon Slayer™', price: '$59.99', subtitle: 'Short description', image: '/images/image2.png', category: 'New' },
  { id: 3, name: 'Sneakers Obanai Iguro - Demon Slayer™', price: '$39.99', subtitle: 'Short description', image: '/images/image3.png', category: 'Trending' },
  { id: 4, name: 'Rengoku Sneakers - Demon Slayer™', price: '$69.99', subtitle: 'Short description', image: '/images/image4.png', category: 'New' },
  { id: 5, name: 'Zenitsu Agatsuma Sneakers - Demon Slayer™', price: '$44.99', subtitle: 'Short description', image: '/images/image5.png', category: 'Trending' },
  { id: 6, name: 'Tanjiro Kamado Sneakers - Demon Slayer™', price: '$59.99', subtitle: 'Short description', image: '/images/image6.png', category: 'Trending' },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Products seeded');
    process.exit();
  })
  .catch(err => console.error(err));
