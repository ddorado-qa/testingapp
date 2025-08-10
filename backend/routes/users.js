const express = require('express');
const router = express.Router();
const db = require('../lib/db');

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT id, name, email, role FROM users ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('GET /api/users error', err);
    res.status(500).json({ error: 'DB error' });
  }
});

// POST /api/users
router.post('/', async (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Missing fields' });
  try {
    const result = await db.query(
      'INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING id, name, email, role',
      [name, email, role || 'user']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST /api/users error', err);
    res.status(500).json({ error: 'DB insert error' });
  }
});

// PUT /api/users/:id
router.put('/:id', async (req, res) => {
  const { name, email, role } = req.body;
  const { id } = req.params;
  try {
    const result = await db.query(
      'UPDATE users SET name=$1, email=$2, role=$3 WHERE id=$4 RETURNING id, name, email, role',
      [name, email, role || 'user', id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('PUT /api/users/:id error', err);
    res.status(500).json({ error: 'DB update error' });
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM users WHERE id=$1', [id]);
    res.status(204).end();
  } catch (err) {
    console.error('DELETE /api/users/:id error', err);
    res.status(500).json({ error: 'DB delete error' });
  }
});

module.exports = router;
