const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT id, username FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Simple auth token (just user id for demo, no JWT)
    res.json({ userId: result.rows[0].id, username: result.rows[0].username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/orders/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await pool.query(
      'SELECT id, product, quantity, status FROM orders WHERE user_id = $1',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/dashboard/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    // For demo return count of orders and username
    const userRes = await pool.query('SELECT username FROM users WHERE id = $1', [userId]);
    const ordersRes = await pool.query('SELECT COUNT(*) FROM orders WHERE user_id = $1', [userId]);
    res.json({
      username: userRes.rows[0].username,
      ordersCount: parseInt(ordersRes.rows[0].count, 10),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Backend escuchando en puerto ${port}`);
});
