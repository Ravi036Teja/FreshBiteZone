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
  isAvailable: { type: Boolean, default: true },
  costPrice: { type: Number, required: true }, // Add this
  ingredients: [{
    inventoryItem: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem' },
    quantity: Number
  }]
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', MenuItemSchema);
