const bcrypt = require('bcryptjs');
const { query } = require('./db');

const SALT_ROUNDS = 10;

function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Login required' });
  }
  next();
}

function registerAuthRoutes(app) {
  // Create account (invite-only: requires ADMIN_SECRET header)
  // Public self-signup is disabled. You create users via Postman with the secret.
  app.post('/auth/register', async (req, res) => {
    try {
      const adminSecret = process.env.ADMIN_SECRET;
      const provided = req.get('X-Admin-Secret') || '';

      if (!adminSecret || provided !== adminSecret) {
        return res.status(403).json({
          error: 'Public registration is closed. Contact the site owner for an account.'
        });
      }

      const email = (req.body.email || '').trim().toLowerCase();
      const password = req.body.password || '';

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
      if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters' });
      }

      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

      const result = await query(
        `INSERT INTO users (email, password_hash)
         VALUES ($1, $2)
         RETURNING id, email, created_at`,
        [email, passwordHash]
      );

      const user = result.rows[0];

      // Do not auto-login as the new user when an admin creates the account
      res.status(201).json({
        id: user.id,
        email: user.email,
        message: 'User created. They can log in with this email and password.'
      });
    } catch (err) {
      if (err.code === '23505') {
        // unique_violation
        return res.status(409).json({ error: 'Email already registered' });
      }
      console.error('Register error:', err.message);
      res.status(500).json({ error: 'Could not register' });
    }
  });

  // Log in
  app.post('/auth/login', async (req, res) => {
    try {
      const email = (req.body.email || '').trim().toLowerCase();
      const password = req.body.password || '';

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const result = await query(
        `SELECT id, email, password_hash FROM users WHERE email = $1`,
        [email]
      );

      const user = result.rows[0];
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      req.session.userId = user.id;
      req.session.email = user.email;

      res.json({
        id: user.id,
        email: user.email
      });
    } catch (err) {
      console.error('Login error:', err.message);
      res.status(500).json({ error: 'Could not log in' });
    }
  });

  // Log out
  app.post('/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Could not log out' });
      }
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out' });
    });
  });

  // Who am I?
  app.get('/auth/me', async (req, res) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: 'Not logged in' });
    }

    try {
      const result = await query(
        `SELECT id, email, created_at FROM users WHERE id = $1`,
        [req.session.userId]
      );
      const user = result.rows[0];
      if (!user) {
        req.session.destroy(() => {});
        return res.status(401).json({ error: 'Not logged in' });
      }
      res.json(user);
    } catch (err) {
      console.error('Me error:', err.message);
      res.status(500).json({ error: 'Could not load user' });
    }
  });
}

module.exports = { registerAuthRoutes, requireAuth };
