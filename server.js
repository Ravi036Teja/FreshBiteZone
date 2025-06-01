// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const morgan = require('morgan');
// const path = require('path');
// const connectDB = require('./config/db');
// <<<<<<< HEAD
// const bodyParser = require('body-parser');

// dotenv.config();
// =======

// // Initialize Express app
// >>>>>>> 4334d9c3bc17205670c6354b60184aa4a02a6708
// const app = express();

// // Connect to database
// connectDB();

// <<<<<<< HEAD
// // Middleware
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow both frontend and admin panel
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control'],
//   credentials: true
// }));

// // Also update your preflight options:
// app.options('*', cors({
//   origin: ['http://localhost:3000', 'http://localhost:3001'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control'],
//   credentials: true
// }));

// app.options('*', cors()); // Handle preflight for all routes
// =======
// // Security middleware
// app.use(helmet());

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: 'Too many requests from this IP, please try again later'
// });
// app.use(limiter);

// // CORS configuration
// const allowedOrigins = [
//   'https://freshbitezone.netlify.app', // Main frontend
//   'https://freshbitezone-adminpanel.netlify.app', // Admin frontend (replace with your actual admin URL)
//   'http://localhost:3001' // Local admin panel
// ];

// app.use(cors({
//   origin: allowedOrigins,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));
// >>>>>>> 4334d9c3bc17205670c6354b60184aa4a02a6708

// // Handle preflight requests
// app.options('*', cors());

// <<<<<<< HEAD
// // Route imports
// const authRoutes = require('./routes/auth');
// const orderRoutes = require('./routes/orderRoutes');
// const paymentRoutes = require('./routes/payment');
// const menuRoutes = require('./routes/menuRoutes');
// const inventoryRoutes = require("./routes/inventoryRoutes");
// app.use("/api/inventory", inventoryRoutes);
// app.use("/api/budget", require("./routes/budgetRoute"));
// // Add to server.js
// const analyticsRoutes = require("./routes/analytics");
// const expensesRoutes = require('./routes/expenses');
// app.use('/api/expenses', expensesRoutes);
// app.use("/api/analytics", analyticsRoutes);


// // Mount routes with explicit paths
// =======
// // Logging middleware
// app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// // Body parsing middleware
// app.use(express.json({ limit: '10kb' }));
// app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// // Route imports
// const authRoutes = require('./routes/auth');
// const orderRoutes = require('./routes/orderRoutes');
// const menuRoutes = require('./routes/menuRoutes');

// // API routes
// >>>>>>> 4334d9c3bc17205670c6354b60184aa4a02a6708
// app.use('/api/auth', authRoutes);
// app.use('/api/menu', menuRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/payments', paymentRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });


// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.status(200).json({
//     status: 'healthy',
//     timestamp: new Date(),
//     environment: process.env.NODE_ENV || 'development'
//   });
// });

// // Root endpoint
// app.get('/', (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     message: 'FreshBiteZone API is running',
//     documentation: 'https://your-docs-link.com',
//     endpoints: [
//       '/api/auth',
//       '/api/menu',
//       '/api/orders',
//       '/api/payments',
//       '/api/health'
//     ],
//     environment: process.env.NODE_ENV || 'development'
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     error: process.env.NODE_ENV === 'production'
//       ? 'Something went wrong!'
//       : err.message,
//     stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
//   });
// });

// // Server configuration
// const PORT = process.env.PORT || 5000;
// <<<<<<< HEAD
// app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
// =======
// app.listen(PORT, () => {
//   console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT} 🚀`);
// });

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err) => {
//   console.error('Unhandled Rejection:', err);
//   // Optionally exit the process
//   // process.exit(1);
// });
// >>>>>>> 4334d9c3bc17205670c6354b60184aa4a02a6708


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Connect to database
connectDB();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

// CORS configuration
const allowedOrigins = [
  'https://freshbitezone.netlify.app', // Main frontend
  'https://freshbitezone-adminpanel.netlify.app', // Admin frontend
  'http://localhost:3000', // Local frontend
  'http://localhost:3001' // Local admin panel
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control'],
  credentials: true
}));

// Handle preflight requests
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
    documentation: 'https://your-docs-link.com',
    endpoints: [
      '/api/auth',
      '/api/menu',
      '/api/orders',
      '/api/payments',
      '/api/health'
    ],
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Something went wrong!'
      : err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
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