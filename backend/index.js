// Backend Express con JWT y conexión a PostgreSQL

import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3001;
const JWT_SECRET = 'supersecretkey123';

// Pool conexión PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.use(cors());
app.use(bodyParser.json());

// Middleware para proteger rutas
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Simulamos usuario fijo para demo
const demoUser = {
  id: 1,
  username: 'qauser',
  password: 'qapass'
};

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (username === demoUser.username && password === demoUser.password) {
    // Generar JWT
    const token = jwt.sign({ id: demoUser.id, username: demoUser.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: demoUser.id, username: demoUser.username } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Obtener órdenes del usuario autenticado
app.get('/api/orders', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Crear nueva orden
app.post('/api/orders', authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO orders (user_id, title, description, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [req.user.id, title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend escuchando en puerto ${PORT}`);
});
