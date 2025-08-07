const express = require('express');
const cors = require('cors');
const db = require('./lib/db');
const users = require('./routes/users');
const products = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', users);
app.use('/api/products', products);

// Iniciar servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
