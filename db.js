const { Pool } = require('pg');

let pool = null;

function getPool() {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return null;
  }

  pool = new Pool({
    connectionString,
    // Required for Render Postgres
    ssl: { rejectUnauthorized: false }
  });

  return pool;
}

async function query(text, params) {
  const p = getPool();
  if (!p) {
    throw new Error('DATABASE_URL is not set');
  }
  return p.query(text, params);
}

async function checkConnection() {
  const p = getPool();
  if (!p) {
    return {
      ok: false,
      error: 'DATABASE_URL is not set on this service'
    };
  }

  try {
    const result = await p.query('SELECT 1 AS connected');
    if (!result || !result.rows || result.rows.length === 0) {
      return { ok: false, error: 'Query returned no rows' };
    }
    return { ok: true, error: null };
  } catch (err) {
    return {
      ok: false,
      error: err && err.message ? err.message : String(err)
    };
  }
}

module.exports = { getPool, query, checkConnection };
