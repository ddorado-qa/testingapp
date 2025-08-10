// Servidor Express (backend) - conecta con Postgres vía pg
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const statsRouter = require('./routes/stats');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/stats', statsRouter);

app.get('/api/ping', (_, res) => res.json({ pong: true }));

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
