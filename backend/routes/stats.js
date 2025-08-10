const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.get('/', async (req, res) => {
  try {
    const users = await db.query('SELECT COUNT(*) AS count FROM users');
    const products = await db.query('SELECT COUNT(*) AS count FROM products');
    const stock = await db.query('SELECT COALESCE(SUM(stock),0) AS total FROM products');
    res.json({
      totalUsers: parseInt(users.rows[0].count, 10),
      totalProducts: parseInt(products.rows[0].count, 10),
      totalStock: parseInt(stock.rows[0].total, 10)
    });
  } catch (err) {
    console.error('GET /api/stats error', err);
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
