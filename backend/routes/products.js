const express = require('express');
const db = require('../lib/db');
const router = express.Router();

router.get('/', (req, res) => {
  const products = db.prepare('SELECT * FROM products').all();
  res.json(products);
});

router.post('/', (req, res) => {
  const { name, price, stock } = req.body;
  const stmt = db.prepare('INSERT INTO products (name, price, stock) VALUES (?, ?, ?)');
  const info = stmt.run(name, price, stock);
  res.json({ id: info.lastInsertRowid });
});

router.put('/:id', (req, res) => {
  const { name, price, stock } = req.body;
  const stmt = db.prepare('UPDATE products SET name=?, price=?, stock=? WHERE id=?');
  stmt.run(name, price, stock, req.params.id);
  res.json({ updated: true });
});

router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM products WHERE id=?').run(req.params.id);
  res.json({ deleted: true });
});

module.exports = router;
