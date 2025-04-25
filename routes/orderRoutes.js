const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET /api/orders - Admin fetch all with user info
// routes/orderRoutes.js
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user') // Populates the entire user object from User collection
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// GET /api/orders/:userId - Fetch orders by user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching user orders:', err);
    res.status(500).json({ message: 'Failed to fetch orders for user' });
  }
});

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
  const { user, items, totalAmount, paymentStatus } = req.body;

  if (!user || !items || !totalAmount || !paymentStatus) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newOrder = new Order({ user, items, totalAmount, paymentStatus });
  await newOrder.save();
  res.status(201).json(newOrder);
});


// PUT /api/orders/:orderId - Update status fields
// routes/orderRoutes.js
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedOrder) return res.status(404).json({ error: 'Order not found' });

    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
