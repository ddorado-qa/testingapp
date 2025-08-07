// API de productos con SQLite persistente
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const router = express.Router();

const DB_PATH = path.join(__dirname, '../../data/products.db');
const db = new sqlite3.Database(DB_PATH);

// Init: crear tabla si no existe
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER NOT NULL
  )`);
});

// Obtener todos los productos
router.get('/', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(rows);
  });
});

// Crear un nuevo producto
router.post('/', (req, res) => {
  const { name, price, stock } = req.body;
  if (!name || price == null || stock == null) {
    return res.status(400).json({ error: 'Faltan campos' });
  }

  const stmt = db.prepare('INSERT INTO products (name, price, stock) VALUES (?, ?, ?)');
  stmt.run(name, price, stock, function (err) {
    if (err) return res.status(500).json({ error: 'Error al insertar' });
    res.status(201).json({ id: this.lastID, name, price, stock });
  });
});

// Editar producto
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;
  if (!name || price == null || stock == null) {
    return res.status(400).json({ error: 'Faltan campos' });
  }

  const stmt = db.prepare('UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?');
  stmt.run(name, price, stock, id, function (err) {
    if (err) return res.status(500).json({ error: 'Error al actualizar' });
    if (this.changes === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ id: parseInt(id), name, price, stock });
  });
});

// Eliminar producto
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM products WHERE id = ?', id, function (err) {
    if (err) return res.status(500).json({ error: 'Error al eliminar' });
    if (this.changes === 0) return res.status(404).json({ error: 'No encontrado' });
    res.status(204).end();
  });
});

module.exports = router;
