const { Pool } = require('pg');

// Render provides DATABASE_URL on the web service.
// Always use SSL with Render Postgres (internal or external).
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    })
  : null;

async function query(text, params) {
  if (!pool) {
    throw new Error('DATABASE_URL is not set');
  }
  return pool.query(text, params);
}

async function checkConnection() {
  if (!pool) {
    return { ok: false, error: 'DATABASE_URL is not set' };
  }
  try {
    await pool.query('SELECT 1');
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

module.exports = { pool, query, checkConnection };
