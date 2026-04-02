const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./middlewares/errorMiddleWare');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const app = express();
app.use(cors());
app.use(express.json());

// Routes
// auth routes
app.use('/api/v1/auth/', authRoutes);
// profile routes
app.use('/api/v1/', profileRoutes);
// product routes
app.use('/api/v1/products', productRoutes);
// cart routes
app.use('/api/v1/cart', cartRoutes);

// Global error handling middleware
app.use(errorMiddleware);

module.exports = app;