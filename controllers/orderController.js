const Order = require('../models/Order');

// Get order details
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone') // Populate user data
      .populate('items.menuItemId', 'image description'); // Optional: populate menu item details

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Verify the requesting user owns this order
    if (order.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized access to order' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// In your order controller
// In your order controller
exports.createOrder = async (req, res) => {
    try {
      // Add orderId generation if you want it
      const orderId = uuidv4();
      const orderData = {
        ...req.body,
        orderId // Add this if you want to keep orderId
      };
  
      const order = new Order(orderData);
      await order.save();
      
      // Return the complete order data
      res.status(201).json({
        ...order.toObject(),
        // Ensure all fields are included in the response
        deliveryAddress: order.deliveryAddress || null,
        userDetails: order.userDetails || null,
        status: order.status,
        paymentStatus: order.paymentStatus
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };