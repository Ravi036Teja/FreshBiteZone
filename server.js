require('dotenv').config(); // Added dotenv import

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const app = express();

// Connect to database
connectDB();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

// CORS configuration
const allowedOrigins = [
  'https://freshbitezone.netlify.app',
  'https://mregg.onrender.com/',
  'https://freshbitezone-adminpanel.netlify.app',
  'http://localhost:3000',
  'http://localhost:3001'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control'],
  credentials: true
}));

app.options('*', cors());

// Logging middleware
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Body parsing middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(bodyParser.json());

// Route imports
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/payment');
const menuRoutes = require('./routes/menuRoutes');
const inventoryRoutes = require("./routes/inventoryRoutes");
const budgetRoutes = require("./routes/budgetRoute");
const analyticsRoutes = require("./routes/analytics");
const expensesRoutes = require('./routes/expenses');

// Mount routes
app.use("/api/inventory", inventoryRoutes);
app.use("/api/budget", budgetRoutes);
app.use('/api/expenses', expensesRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'FreshBiteZone API is running',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware (single instance)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Something went wrong!'
      : err.message
  });
});

// Server configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT} 🚀`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});