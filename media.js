const { query } = require('./db');
const { requireAuth } = require('./auth');

const RESOURCES = ['movies', 'games', 'shows'];

function registerMediaRoutes(app) {
  for (const resource of RESOURCES) {
    // List current user's items
    app.get(`/${resource}`, requireAuth, async (req, res) => {
      try {
        const result = await query(
          `SELECT id, title, genre, year
           FROM ${resource}
           WHERE user_id = $1
           ORDER BY id`,
          [req.session.userId]
        );
        res.json(result.rows);
      } catch (err) {
        console.error(`GET /${resource}:`, err.message);
        res.status(500).json({ error: `Could not load ${resource}` });
      }
    });

    // Create
    app.post(`/${resource}`, requireAuth, async (req, res) => {
      try {
        const title = (req.body.title || '').trim();
        const genre = (req.body.genre || '').trim();
        const year = String(req.body.year || '').trim();

        if (!title || !genre || !year) {
          return res.status(400).json({ error: 'title, genre, and year are required' });
        }

        const countResult = await query(
          `SELECT COUNT(*)::int AS count FROM ${resource} WHERE user_id = $1`,
          [req.session.userId]
        );
        if (countResult.rows[0].count >= 10) {
          return res.status(400).json({
            error: `Maximum of 10 ${resource} allowed`
          });
        }

        const result = await query(
          `INSERT INTO ${resource} (user_id, title, genre, year)
           VALUES ($1, $2, $3, $4)
           RETURNING id, title, genre, year`,
          [req.session.userId, title, genre, year]
        );

        res.status(201).json(result.rows[0]);
      } catch (err) {
        console.error(`POST /${resource}:`, err.message);
        res.status(500).json({ error: `Could not create ${resource.slice(0, -1)}` });
      }
    });

    // Update (only own rows)
    app.put(`/${resource}/:id`, requireAuth, async (req, res) => {
      try {
        const id = Number(req.params.id);
        const title = (req.body.title || '').trim();
        const genre = (req.body.genre || '').trim();
        const year = String(req.body.year || '').trim();

        if (!title || !genre || !year) {
          return res.status(400).json({ error: 'title, genre, and year are required' });
        }

        const result = await query(
          `UPDATE ${resource}
           SET title = $1, genre = $2, year = $3
           WHERE id = $4 AND user_id = $5
           RETURNING id, title, genre, year`,
          [title, genre, year, id, req.session.userId]
        );

        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Not found' });
        }

        res.json(result.rows[0]);
      } catch (err) {
        console.error(`PUT /${resource}/:id:`, err.message);
        res.status(500).json({ error: 'Could not update item' });
      }
    });

    // Delete (only own rows)
    app.delete(`/${resource}/:id`, requireAuth, async (req, res) => {
      try {
        const id = Number(req.params.id);
        const result = await query(
          `DELETE FROM ${resource}
           WHERE id = $1 AND user_id = $2
           RETURNING id`,
          [id, req.session.userId]
        );

        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Not found' });
        }

        res.status(200).json({ message: 'Deleted' });
      } catch (err) {
        console.error(`DELETE /${resource}/:id:`, err.message);
        res.status(500).json({ error: 'Could not delete item' });
      }
    });
  }
}

module.exports = { registerMediaRoutes };
