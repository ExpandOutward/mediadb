const API_BASE = 'http://127.0.0.1:3000';
// LEARNED: Delcaring the API_BASE variable as a URL prevents repeating the URL in every fetch() global function.

// Load data when page loads
document.addEventListener('DOMContentLoaded', () => {
  loadMovies();
  loadGames();
  loadShows();
});
// LEARNED: The load functions pre-populate each table. Otherwise, they will be blank until a tab is clicked.

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
// LEARNED: Async allows us to use "await," which waits for the server response.
// LEARNED: Without async and await, we'd need a bunch of .then() chains. Async is cleaner.
// LEARNED: Const is used to declare the variables because the actual variables are not reassigned.
// LEARNED: Editing the content is not variable reassignment. The variables themselves do not change.

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
          <td>${show.genre}</td>
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
    console.error('Error loading shows:', error);
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

// Global Delete handler
document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('btn-danger')) {
    if (!confirm('Are you sure you want to delete this item?')) return;

    const row = e.target.closest('tr');
    const id = row.cells[0].textContent.trim();
    
    // Determine resource type from closest tab or table
    const tabPane = e.target.closest('.tab-pane');
    const resource = tabPane.id; // 'movies', 'games', 'shows'

    try {
      const response = await fetch(`${API_BASE}/${resource}/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Refresh the correct table
        if (resource === 'movies') loadMovies();
        else if (resource === 'games') loadGames();
        else if (resource === 'shows') loadShows();
        
        alert('Item deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Error deleting item');
    }
  }
});
// LEARNED: Closest refers to the closest defined element to the button. <tr> in this case.
// REMEMBER: I need to remember that we are removing data from a JSON file, not deleting a row.

// Edit Movie
document.addEventListener('click', (e) => {
  if (e.target.textContent === 'Edit' && e.target.closest('#movies')) {
    const row = e.target.closest('tr');
    const id = row.cells[0].textContent.trim();
    
    // Populate modal
    document.getElementById('edit-movie-id').value = id;
    document.getElementById('edit-movie-title').value = row.cells[1].textContent;
    document.getElementById('edit-movie-genre').value = row.cells[2].textContent;
    document.getElementById('edit-movie-year').value = row.cells[3].textContent;
    
    new bootstrap.Modal(document.getElementById('editMovieModal')).show();
  }

// Edit Game
if (e.target.textContent === 'Edit' && e.target.closest('#games')) {
  const row = e.target.closest('tr');
  const id = row.cells[0].textContent.trim();
  
  document.getElementById('edit-game-id').value = id;
  document.getElementById('edit-game-title').value = row.cells[1].textContent;
  document.getElementById('edit-game-genre').value = row.cells[2].textContent;
  document.getElementById('edit-game-year').value = row.cells[3].textContent;
  
  new bootstrap.Modal(document.getElementById('editGameModal')).show();
}

if (e.target.textContent === 'Edit' && e.target.closest('#shows')) {
  const row = e.target.closest('tr');
  const id = row.cells[0].textContent.trim();
  
  document.getElementById('edit-show-id').value = id;
  document.getElementById('edit-show-title').value = row.cells[1].textContent;
  document.getElementById('edit-show-genre').value = row.cells[2].textContent;
  document.getElementById('edit-show-year').value = row.cells[3].textContent;
  
  new bootstrap.Modal(document.getElementById('editShowModal')).show();
}
});

// Save Movie Edit
document.getElementById('save-movie-edit').addEventListener('click', async () => {
  const id = document.getElementById('edit-movie-id').value;
  const updatedMovie = {
    title: document.getElementById('edit-movie-title').value,
    genre: document.getElementById('edit-movie-genre').value,
    year: document.getElementById('edit-movie-year').value
  };

  try {
    const response = await fetch(`${API_BASE}/movies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedMovie)
    });

    if (response.ok) {
      bootstrap.Modal.getInstance(document.getElementById('editMovieModal')).hide();
      loadMovies();
      alert('Movie updated successfully!');
    }
  } catch (error) {
    console.error('Error updating movie:', error);
  }
});

// Save Game Edit
document.getElementById('save-game-edit').addEventListener('click', async () => {
  const id = document.getElementById('edit-game-id').value;
  const updatedGame = {
    title: document.getElementById('edit-game-title').value,
    genre: document.getElementById('edit-game-genre').value,
    year: document.getElementById('edit-game-year').value
  };

  try {
    const response = await fetch(`${API_BASE}/games/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedGame)
    });

    if (response.ok) {
      bootstrap.Modal.getInstance(document.getElementById('editGameModal')).hide();
      loadGames();
      alert('Game updated successfully!');
    }
  } catch (error) {
    console.error('Error updating game:', error);
  }
});

// Save Show Edit
document.getElementById('save-show-edit').addEventListener('click', async () => {
  const id = document.getElementById('edit-show-id').value;
  const updatedShow = {
    title: document.getElementById('edit-show-title').value,
    genre: document.getElementById('edit-show-genre').value,
    year: document.getElementById('edit-show-year').value
  };

  try {
    const response = await fetch(`${API_BASE}/shows/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedShow)
    });

    if (response.ok) {
      bootstrap.Modal.getInstance(document.getElementById('editShowModal')).hide();
      loadShows();
      alert('Show updated successfully!');
    }
  } catch (error) {
    console.error('Error updating show:', error);
  }
});