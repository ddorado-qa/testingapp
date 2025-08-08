const express = require('express');
const router = express.Router();
const db = require('../database');

// Obtener todos los usuarios
router.get('/', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Crear nuevo usuario
router.post('/', (req, res) => {
  const { name, email } = req.body;
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name, email });
  });
});

// Actualizar usuario
router.put('/:id', (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, name, email });
  });
});

// Eliminar usuario
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM users WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: req.params.id });
  });
});

module.exports = router;
