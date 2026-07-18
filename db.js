const { Pool } = require('pg');

// Render (and most hosts) provide the connection string as DATABASE_URL.
// Locally you can set the same variable in a .env file later.
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      // Render Postgres often needs SSL from outside; internal URL may not.
      ssl: process.env.DATABASE_URL.includes('render.com')
        ? { rejectUnauthorized: false }
        : false
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
    const result = await pool.query('SELECT 1 AS ok');
    return { ok: result.rows[0].ok === 1 };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

module.exports = { pool, query, checkConnection };
