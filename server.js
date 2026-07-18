const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Parse JSON bodies on POST/PUT
app.use(express.json());

// Add a Movie
app.post('/movies', (req, res) => {
  const filePath = path.join(__dirname, 'mediadb.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Business rule: max 10
  // Issue #1 Resolution
  if (data.movies.length >= 10) {
    return res.status(400).json({ error: 'Maximum of 10 movies allowed' });
  }

  const newMovie = {
    id: data.movies.length ? Math.max(...data.movies.map(m => m.id)) + 1 : 1,
    title: req.body.title,
    genre: req.body.genre,
    year: req.body.year
  };

  data.movies.push(newMovie);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.status(201).json(newMovie);
});

// Add a Game
app.post('/games', (req, res) => {
  const filePath = path.join(__dirname, 'mediadb.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Business rule: max 10
  // Issue #1 Resolution
  if (data.games.length >= 10) {
    return res.status(400).json({ error: 'Maximum of 10 games allowed' });
  }

  const newGame = {
    id: data.games.length ? Math.max(...data.games.map(g => g.id)) + 1 : 1,
    title: req.body.title,
    genre: req.body.genre,
    year: req.body.year
  };

  data.games.push(newGame);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.status(201).json(newGame);
});

// Add a Show
app.post('/shows', (req, res) => {
  const filePath = path.join(__dirname, 'mediadb.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Business rule: max 10
  // Issue #1 Resolution
  if (data.shows.length >= 10) {
    return res.status(400).json({ error: 'Maximum of 10 shows allowed' });
  }

  const newShow = {
    id: data.shows.length ? Math.max(...data.shows.map(s => s.id)) + 1 : 1,
    title: req.body.title,
    genre: req.body.genre,
    year: req.body.year
  };

  data.shows.push(newShow);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.status(201).json(newShow);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Delete a Movie
app.delete('/movies/:id', (req, res) => {
  const filePath = path.join(__dirname, 'mediadb.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const id = Number(req.params.id);

  const before = data.movies.length;
  data.movies = data.movies.filter(m => m.id !== id);

  if (data.movies.length === before) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.status(200).json({ message: 'Deleted' });
});

// Delete a Game
app.delete('/games/:id', (req, res) => {
  const filePath = path.join(__dirname, 'mediadb.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const id = Number(req.params.id);

  const before = data.games.length;
  data.games = data.games.filter(g => g.id !== id);

  if (data.games.length === before) {
    return res.status(404).json({ error: 'Game not found' });
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.status(200).json({ message: 'Deleted' });
});

// Delete a Show
app.delete('/shows/:id', (req, res) => {
  const filePath = path.join(__dirname, 'mediadb.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const id = Number(req.params.id);

  const before = data.shows.length;
  data.shows = data.shows.filter(s => s.id !== id);

  if (data.shows.length === before) {
    return res.status(404).json({ error: 'Show not found' });
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.status(200).json({ message: 'Deleted' });
});

// Edit a Movie
app.put('/movies/:id', (req, res) => {
  const filePath = path.join(__dirname, 'mediadb.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const id = Number(req.params.id);
  const movie = data.movies.find(m => m.id === id);

  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  movie.title = req.body.title;
  movie.genre = req.body.genre;
  movie.year = req.body.year;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json(movie);
});

// Edit a Game
app.put('/games/:id', (req, res) => {
  const filePath = path.join(__dirname, 'mediadb.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const id = Number(req.params.id);
  const game = data.games.find(g => g.id === id);

  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }

  game.title = req.body.title;
  game.genre = req.body.genre;
  game.year = req.body.year;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json(game);
});

// Edit a Show
app.put('/shows/:id', (req, res) => {
  const filePath = path.join(__dirname, 'mediadb.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const id = Number(req.params.id);
  const show = data.shows.find(s => s.id === id);

  if (!show) {
    return res.status(404).json({ error: 'Show not found' });
  }

  show.title = req.body.title;
  show.genre = req.body.genre;
  show.year = req.body.year;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json(show);
});

app.use(express.static('public'));

// GET Movies
app.get('/movies', (req, res) => {
  const filePath = path.join(__dirname, 'mediadb.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  res.json(data.movies);
});

// GET Games
app.get('/games', (req, res) => {
  const filePath = path.join(__dirname, 'mediadb.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  res.json(data.games);
});

// GET Shows
app.get('/shows', (req, res) => {
  const filePath = path.join(__dirname, 'mediadb.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  res.json(data.shows);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});