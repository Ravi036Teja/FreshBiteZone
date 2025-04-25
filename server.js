const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');  // Authentication routes
const orderRoutes = require('./routes/orderRoutes');


dotenv.config();
const app = express();
connectDB();

const allowedOrigins = [
    'http://localhost:3000',  // Your React app's default origin
    'http://localhost:3001',  // Another port you might be using
    // Add any other domains you need to allow
  ];
// Middleware FIRST
app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true
  }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes AFTER middleware
app.use('/api/auth', authRoutes);
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
