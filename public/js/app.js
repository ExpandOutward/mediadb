console.log('app.js loaded successfully');

const API_BASE = 'http://localhost:3000';

// Load data when page loads
document.addEventListener('DOMContentLoaded', () => {
  loadMovies();
  loadGames();
  loadShows();
});

// ==================== LOAD FUNCTIONS ====================

async function loadMovies() {
  try {
    const response = await fetch(`${API_BASE}/movies`);
    const movies = await response.json();
    
    const tbody = document.getElementById('movies-table-body');
    tbody.innerHTML = '';
    
    movies.forEach(movie => {
      const row = `
        <tr>
          <td>${movie.id}</td>
          <td>${movie.title}</td>
          <td>${movie.genre}</td>
          <td>${movie.year}</td>
          <td>
            <button class="btn btn-sm btn-primary">Edit</button>
            <button class="btn btn-sm btn-danger">Delete</button>
          </td>
        </tr>
      `;
      tbody.innerHTML += row;
    });
  } catch (error) {
    console.error('Error loading movies:', error);
  }
}

async function loadGames() {
  try {
    const response = await fetch(`${API_BASE}/games`);
    const games = await response.json();
    
    const tbody = document.getElementById('games-table-body');
    tbody.innerHTML = '';
    
    games.forEach(game => {
      const row = `
        <tr>
          <td>${game.id}</td>
          <td>${game.title}</td>
          <td>${game.genre}</td>
          <td>${game.year}</td>
          <td>
            <button class="btn btn-sm btn-primary">Edit</button>
            <button class="btn btn-sm btn-danger">Delete</button>
          </td>
        </tr>
      `;
      tbody.innerHTML += row;
    });
  } catch (error) {
    console.error('Error loading games:', error);
  }
}

// ==================== FORM HANDLERS ====================

// Add Movie
const addMovieForm = document.getElementById('add-movie-form');
if (addMovieForm) {
  addMovieForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newMovie = {
      title: document.getElementById('movie-title').value,
      genre: document.getElementById('movie-genre').value,
      year: document.getElementById('movie-year').value
    };

    try {
      const response = await fetch(`${API_BASE}/movies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMovie)
      });

      if (response.ok) {
        addMovieForm.reset();
        loadMovies();
        alert('Movie added successfully!');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Error adding movie');
    }
  });
}

// Add Game
const addGameForm = document.getElementById('add-game-form');
if (addGameForm) {
  addGameForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newGame = {
      title: document.getElementById('game-title').value,
      genre: document.getElementById('game-genre').value,
      year: document.getElementById('game-year').value
    };

    try {
      const response = await fetch(`${API_BASE}/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGame)
      });

      if (response.ok) {
        addGameForm.reset();
        loadGames();
        alert('Game added successfully!');
      }
    } catch (error) {
      console.error('Error adding game:', error);
      alert('Error adding game');
    }
  });
}

// Add Show
const addShowForm = document.getElementById('add-show-form');
if (addShowForm) {
  addShowForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newShow = {
      title: document.getElementById('show-title').value,
      genre: document.getElementById('show-genre').value,
      year: document.getElementById('show-year').value
    };

    try {
      const response = await fetch(`${API_BASE}/shows`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newShow)
      });

      if (response.ok) {
        addShowForm.reset();
        loadShows();
        alert('Show added successfully!');
      }
    } catch (error) {
      console.error('Error adding show:', error);
      alert('Error adding show');
    }
  });
}