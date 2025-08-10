// Conexión PG con pool
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://qa:qapass@postgres:5432/qaapp',
});

async function query(text, params) {
  return pool.query(text, params);
}

module.exports = { query, pool };
