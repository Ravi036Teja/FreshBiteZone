const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_gHlnR8JA8ECJOe',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'W4Wm3ZP8TIkXF8ZQJtpDPmMW'
});

// Create Razorpay Order
router.post('/create-razorpay-order', async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;
    
    const options = {
      amount: Math.round(amount), // Amount in paise
      currency: currency || 'INR',
      receipt: receipt || `receipt_${Date.now()}`,
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error('Razorpay order error:', err);
    res.status(500).json({ 
      error: 'Failed to create payment order',
      details: err.error?.description 
    });
  }
});

// Verify Payment
router.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderId } = req.body;
    
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'W4Wm3ZP8TIkXF8ZQJtpDPmMW')
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Invalid signature' });
    }

    // Update your order in database here
    // ...

    res.json({ success: true });
  } catch (err) {
    console.error('Payment verification error:', err);
    res.status(500).json({ success: false, error: 'Payment verification failed' });
  }
});

module.exports = router;