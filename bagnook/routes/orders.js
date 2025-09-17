const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ GET /api/orders/:userId - Get order history for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [orders] = await db.query(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
    res.json(orders);
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;


