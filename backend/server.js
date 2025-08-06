// Servidor Express con endpoints extendidos
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

let products = [
  { id: 1, name: 'Keyboard', price: 50 },
  { id: 2, name: 'Mouse', price: 30 },
];
let logs = [
  { id: 1, type: 'info', message: 'App started', timestamp: new Date().toISOString() }
];

// --- PRODUCTS ---
app.get('/api/products', (req, res) => res.json(products));
app.post('/api/products', (req, res) => {
  const product = { id: Date.now(), ...req.body };
  products.push(product);
  logs.push({ id: Date.now(), type: 'create', message: `Created product ${product.name}`, timestamp: new Date().toISOString() });
  res.json(product);
});
app.put('/api/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id == req.params.id);
  products[idx] = { ...products[idx], ...req.body };
  logs.push({ id: Date.now(), type: 'update', message: `Updated product ${products[idx].name}`, timestamp: new Date().toISOString() });
  res.json(products[idx]);
});
app.delete('/api/products/:id', (req, res) => {
  products = products.filter(p => p.id != req.params.id);
  logs.push({ id: Date.now(), type: 'delete', message: `Deleted product ${req.params.id}`, timestamp: new Date().toISOString() });
  res.json({ ok: true });
});

// --- LOGS ---
app.get('/api/logs', (req, res) => {
  const { type } = req.query;
  let filtered = logs;
  if (type) filtered = filtered.filter(log => log.type === type);
  res.json(filtered);
});

app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
