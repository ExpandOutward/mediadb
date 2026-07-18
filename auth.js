const bcrypt = require('bcryptjs');
const { query } = require('./db');

const SALT_ROUNDS = 10;

function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Login required' });
  }
  next();
}

function normalizeUsername(value) {
  return (value || '').trim().toLowerCase();
}

function registerAuthRoutes(app) {
  // Create account (invite-only: requires ADMIN_SECRET header)
  app.post('/auth/register', async (req, res) => {
    try {
      const adminSecret = process.env.ADMIN_SECRET;
      const provided = req.get('X-Admin-Secret') || '';

      if (!adminSecret || provided !== adminSecret) {
        return res.status(403).json({
          error: 'Public registration is closed. Contact the site owner for an account.'
        });
      }

      // Accept username; also accept email for older Postman collections
      const username = normalizeUsername(req.body.username || req.body.email);
      const password = req.body.password || '';

      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }
      if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters' });
      }

      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

      const result = await query(
        `INSERT INTO users (username, password_hash)
         VALUES ($1, $2)
         RETURNING id, username, created_at`,
        [username, passwordHash]
      );

      const user = result.rows[0];

      res.status(201).json({
        id: user.id,
        username: user.username,
        message: 'User created. They can log in with this username and password.'
      });
    } catch (err) {
      if (err.code === '23505') {
        return res.status(409).json({ error: 'Username already taken' });
      }
      console.error('Register error:', err.message);
      res.status(500).json({ error: 'Could not register' });
    }
  });

  // Log in
  app.post('/auth/login', async (req, res) => {
    try {
      const username = normalizeUsername(req.body.username || req.body.email);
      const password = req.body.password || '';

      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }

      const result = await query(
        `SELECT id, username, password_hash FROM users WHERE username = $1`,
        [username]
      );

      const user = result.rows[0];
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      req.session.userId = user.id;
      req.session.username = user.username;

      res.json({
        id: user.id,
        username: user.username
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
        `SELECT id, username, created_at FROM users WHERE id = $1`,
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

  // Change password (logged-in user)
  app.post('/auth/change-password', requireAuth, async (req, res) => {
    try {
      const currentPassword = req.body.currentPassword || '';
      const newPassword = req.body.newPassword || '';

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          error: 'currentPassword and newPassword are required'
        });
      }
      if (newPassword.length < 8) {
        return res.status(400).json({ error: 'New password must be at least 8 characters' });
      }

      const result = await query(
        `SELECT id, password_hash FROM users WHERE id = $1`,
        [req.session.userId]
      );
      const user = result.rows[0];
      if (!user) {
        return res.status(401).json({ error: 'Not logged in' });
      }

      const match = await bcrypt.compare(currentPassword, user.password_hash);
      if (!match) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }

      const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
      await query(
        `UPDATE users SET password_hash = $1 WHERE id = $2`,
        [passwordHash, req.session.userId]
      );

      res.json({ message: 'Password updated' });
    } catch (err) {
      console.error('Change password error:', err.message);
      res.status(500).json({ error: 'Could not change password' });
    }
  });
}

module.exports = { registerAuthRoutes, requireAuth };
