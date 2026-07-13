const API_BASE = 'http://localhost:3000';

// Tab switching
document.getElementById('movies-tab').addEventListener('shown.bs.tab', loadMovies);
document.getElementById('games-tab').addEventListener('shown.bs.tab', loadGames);
document.getElementById('shows-tab').addEventListener('shown.bs.tab', loadShows);

// Load Movies when page loads
document.addEventListener('DOMContentLoaded', () => {
  loadMovies();
});

async function loadMovies() {
  try {
    const response = await fetch(`${API_BASE}/movies`);
    const movies = await response.json();
    
    const tbody = document.getElementById('movies-table-body');
    tbody.innerHTML = ''; // Clear existing rows
    
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
          <td>${game.system || game.genre}</td>
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

async function loadShows() {
  try {
    const response = await fetch(`${API_BASE}/shows`);
    const shows = await response.json();
    
    const tbody = document.getElementById('shows-table-body');
    tbody.innerHTML = '';
    
    shows.forEach(show => {
      const row = `
        <tr>
          <td>${show.id}</td>
          <td>${show.title}</td>
          <td>${show.system || show.genre}</td>
          <td>${show.year}</td>
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