const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow both frontend and admin panel
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control'],
  credentials: true
}));

// Also update your preflight options:
app.options('*', cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control'],
  credentials: true
}));

app.options('*', cors()); // Handle preflight for all routes

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Route imports
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/payment');
const menuRoutes = require('./routes/menuRoutes');

// Mount routes with explicit paths
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));