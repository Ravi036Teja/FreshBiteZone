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
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Initial connection error:', err.message);
    process.exit(1);
  }
};

// Add these listeners outside the connectDB function
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