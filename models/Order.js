const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    menuItemId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'MenuItem',
      required: true 
    },
    name: { 
      type: String, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true 
    },
    quantity: { 
      type: Number, 
      required: true 
    },
    image: {
      type: String
    }
  }],
  totalAmount: { 
    type: Number, 
    required: true 
  },
  deliveryOption: { 
    type: String, 
    enum: ['delivery', 'pickup'], 
    required: true 
  },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    instructions: String
  },
  paymentMethod: { 
    type: String, 
    enum: ['cash', 'card', 'upi'], 
    required: true 
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'failed'], 
    default: 'pending' 
  },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'out for delivery', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  userDetails: {
    name: String,
    email: String,
    phone: String
  },
  orderId: {
    type: String,
    default: uuidv4,
    unique: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);