const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const orderSchema = new mongoose.Schema({
 // models/Order.js
user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
},
  orderId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  items: [
    {
      name: String,
      description: String,
      price: Number,
      quantity: Number,
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  orderStatus: {
    type: String,
    enum: ['processing', 'outfordelivery', 'delivered', 'cancelled'],
    default: 'processing',
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
