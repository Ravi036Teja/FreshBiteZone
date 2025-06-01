// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB Connected ✅");
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

// config/db.js
// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
// <<<<<<< HEAD
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000,
//       socketTimeoutMS: 45000,
//       family: 4
//     });
//     console.log('MongoDB Connected...');
// =======
//       useUnifiedTopology: true
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
// >>>>>>> 4334d9c3bc17205670c6354b60184aa4a02a6708
//   } catch (err) {
//     console.error('Initial connection error:', err.message);
//     process.exit(1);
//   }
// };

// <<<<<<< HEAD
// // Add these listeners outside the connectDB function
// mongoose.connection.on('error', err => {
//   console.error(`DB connection error: ${err.message}`);
// });

// mongoose.connection.on('disconnected', () => {
//   console.log('DB disconnected');
// });

// mongoose.connection.on('reconnected', () => {
//   console.log('DB reconnected');
// });

// =======
// >>>>>>> 4334d9c3bc17205670c6354b60184aa4a02a6708
// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('Initial connection error:', err.message);
    process.exit(1);
  }
};

// Connection event listeners
mongoose.connection.on('error', err => {
  console.error(`DB connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('DB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('DB reconnected');
});

module.exports = connectDB;