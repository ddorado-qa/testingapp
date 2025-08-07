const express = require('express');
const db = require('../lib/db');
const router = express.Router();

router.get('/', (req, res) => {
  const users = db.prepare('SELECT * FROM users').all();
  res.json(users);
});

router.post('/', (req, res) => {
  const { name, email, role } = req.body;
  const stmt = db.prepare('INSERT INTO users (name, email, role) VALUES (?, ?, ?)');
  const info = stmt.run(name, email, role);
  res.json({ id: info.lastInsertRowid });
});

router.put('/:id', (req, res) => {
  const { name, email, role } = req.body;
  const stmt = db.prepare('UPDATE users SET name=?, email=?, role=? WHERE id=?');
  stmt.run(name, email, role, req.params.id);
  res.json({ updated: true });
});

router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM users WHERE id=?').run(req.params.id);
  res.json({ deleted: true });
});

module.exports = router;
