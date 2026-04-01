const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./middlewares/errorMiddleWare');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const app = express();
app.use(cors());
app.use(express.json());

// Routes
// auth routes
app.use('/api/v1/auth/', authRoutes);
// profile routes
app.use('/api/v1/', profileRoutes);

// Global error handling middleware
app.use(errorMiddleware);

module.exports = app;