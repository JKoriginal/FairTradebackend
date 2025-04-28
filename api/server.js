require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const supportRoutes = require('./routes/supportRoutes');
const riviewRoutes = require('./routes/reviews');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend.vercel.app'], // Add your frontend Vercel URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));
app.use('/supportIMG', express.static(path.join(__dirname, 'supportIMG')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/reviews', riviewRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Export the app for Vercel
module.exports = app;