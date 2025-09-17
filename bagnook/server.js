const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');

const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');
const ordersRoutes = require('./routes/orders'); // ✅ NEW

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // To parse JSON body

// ✅ Routes
app.use('/api/auth', authRoutes);              // Signup/Login
app.use('/api/payment', paymentRoutes);        // Razorpay Payments
app.use('/api/orders', ordersRoutes);          // ✅ Order History Fetch

// ✅ Health Check
app.get('/', (req, res) => {
  res.send('🎉 Bagnook backend is running');
});

// ✅ Get All Products
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    console.error("❌ Database error:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ✅ Get Profile Info by User ID
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const [rows] = await db.query(
      'SELECT id, name, email, phone, address, city, pincode FROM users WHERE id = ?',
      [userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('❌ Error fetching user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Update Profile Info
app.put('/update-profile', async (req, res) => {
  const { id, name, phone, address, city, pincode } = req.body;
  try {
    await db.query(
      `UPDATE users SET name=?, phone=?, address=?, city=?, pincode=? WHERE id=?`,
      [name, phone, address, city, pincode, id]
    );
    res.json({ message: 'Profile updated successfully!' });
  } catch (err) {
    console.error('❌ Error updating profile:', err);
    res.status(500).json({ error: 'Update failed' });
  }
});

// ✅ Place Order
app.post('/api/order', async (req, res) => {
  const { userId, items, total, method, paymentId } = req.body;

  if (!userId || !items || !total || !method) {
    return res.status(400).json({ message: "Missing order data" });
  }

  try {
    await db.query(
      `INSERT INTO orders (user_id, items, total, method, payment_id, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [userId, JSON.stringify(items), total, method, paymentId || null]
    );

    res.json({ message: '✅ Order placed successfully!' });
  } catch (err) {
    console.error('❌ Error placing order:', err);
    res.status(500).json({ message: 'Order failed' });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});




