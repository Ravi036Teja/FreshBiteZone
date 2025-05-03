const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Add this import
const Order = require('../models/Order');

// GET all orders (admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET orders by user ID (single route with validation)
router.get('/user/:userId', async (req, res) => {
  try {
    // Validate MongoDB ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const orders = await Order.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('user', 'name email')
      .populate('items.menuItemId', 'name price imageUrl');

    res.status(200).json(orders || []);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// // GET single order by ID
// Remove circular population
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('user', 'name email phone') // Remove any nested population
      .lean(); // Convert to plain JavaScript object
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET specific order by order ID
// router.get('/order/:orderId', async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.orderId)
//       .populate('user', 'name email phone');
    
//     if (!order) {
//       return res.status(404).json({ error: 'Order not found' });
//     }

//     res.json(order);
//   } catch (error) {
//     console.error('Error fetching order:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// CREATE new order
router.post('/', async (req, res) => {
  try {
    const { user, items, totalAmount, deliveryOption, deliveryAddress, paymentMethod, paymentStatus, userDetails, orderId } = req.body;
    
    if (!user || !items || !totalAmount || !deliveryOption || !paymentMethod) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newOrder = new Order({
      user,
      items,
      totalAmount,
      deliveryOption,
      deliveryAddress,
      paymentMethod,
      paymentStatus,
      status: 'pending',
      userDetails,
      orderId,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE order
router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;