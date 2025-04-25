const mongoose = require('mongoose');

// const MenuItemSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   price: Number,
//   imageUrl: String,
//   category: String,
// });

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  imageUrl: String,
  category: String,
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', MenuItemSchema);
