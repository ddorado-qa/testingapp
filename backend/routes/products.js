const express = require('express');
const router = express.Router();
const db = require('../lib/db');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT id, name, price, stock FROM products ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('GET /api/products error', err);
    res.status(500).json({ error: 'DB error' });
  }
});

// POST /api/products
router.post('/', async (req, res) => {
  const { name, price, stock } = req.body;
  if (!name || price == null) return res.status(400).json({ error: 'Missing fields' });
  try {
    const result = await db.query(
      'INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING id, name, price, stock',
      [name, price, stock || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST /api/products error', err);
    res.status(500).json({ error: 'DB insert error' });
  }
});

// PUT /api/products/:id
router.put('/:id', async (req, res) => {
  const { name, price, stock } = req.body;
  const { id } = req.params;
  try {
    const result = await db.query(
      'UPDATE products SET name=$1, price=$2, stock=$3 WHERE id=$4 RETURNING id, name, price, stock',
      [name, price, stock || 0, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('PUT /api/products/:id error', err);
    res.status(500).json({ error: 'DB update error' });
  }
});

// DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM products WHERE id=$1', [id]);
    res.status(204).end();
  } catch (err) {
    console.error('DELETE /api/products/:id error', err);
    res.status(500).json({ error: 'DB delete error' });
  }
});

module.exports = router;
