// bagnook/routes/payment.js
const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();
const db = require('../db');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
router.post('/razorpay', async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount,
      currency: "INR",
      receipt: "receipt_order_" + Math.floor(Math.random() * 10000)
    };
    const order = await razorpay.orders.create(options);
    res.json({
      key: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      order_id: order.id
    });
  } catch (err) {
    console.error("Razorpay Error:", err);
    res.status(500).json({ message: "Payment failed" });
  }
});

// Store order (COD or paid)
router.post('/order', async (req, res) => {
  const { userId, items, total, method, paymentId } = req.body;

  try {
    await db.query(
      'INSERT INTO orders (userId, items, total, method, paymentId) VALUES (?, ?, ?, ?, ?)',
      [userId, JSON.stringify(items), total, method, paymentId]
    );
    res.json({ message: "Order placed successfully!" });
  } catch (err) {
    console.error("Order Error:", err);
    res.status(500).json({ message: "Order failed" });
  }
});

module.exports = router;
