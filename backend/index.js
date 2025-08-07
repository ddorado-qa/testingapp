// Servidor express principal
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', require('./api/products'));

// Ping
app.get('/api/ping', (_, res) => res.json({ pong: true }));

// Frontend en producción
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend escuchando en http://localhost:${PORT}`);
});
