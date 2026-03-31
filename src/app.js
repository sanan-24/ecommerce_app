const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./middlewares/errorMiddleWare');
const authRoutes = require('./routes/authRoutes');
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth/', authRoutes);

// Global error handling middleware
app.use(errorMiddleware);

module.exports = app;