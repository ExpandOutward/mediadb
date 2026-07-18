const API_BASE = '';
// LEARNED: Empty API_BASE uses the same host (local or Render).

let movies = [];
let games = [];
let shows = [];
let currentUser = null;

// Send session cookie with every request
function apiFetch(url, options = {}) {
  return fetch(`${API_BASE}${url}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', async () => {
  const currentYear = new Date().getFullYear();

  document.getElementById('movie-year').max = currentYear;
  document.getElementById('game-year').max = currentYear;
  document.getElementById('show-year').max = currentYear;
  document.getElementById('edit-movie-year').max = currentYear;
  document.getElementById('edit-game-year').max = currentYear;
  document.getElementById('edit-show-year').max = currentYear;

  document.getElementById('edit-movie-year').min = 1500;
  document.getElementById('edit-game-year').min = 1500;
  document.getElementById('edit-show-year').min = 1500;

  document.getElementById('login-btn').addEventListener('click', () => handleAuth('login'));
  document.getElementById('logout-btn').addEventListener('click', handleLogout);

  await checkSession();
});

async function checkSession() {
  try {
    const response = await apiFetch('/auth/me');
    if (response.ok) {
      currentUser = await response.json();
      showApp();
    } else {
      showAuth();
    }
  } catch (error) {
    console.error('Session check failed:', error);
    showAuth();
  }
}

function showAuth() {
  currentUser = null;
  document.getElementById('auth-panel').hidden = false;
  document.getElementById('app-panel').hidden = true;
}

function showApp() {
  document.getElementById('auth-panel').hidden = true;
  document.getElementById('app-panel').hidden = false;
  document.getElementById('user-label').textContent = currentUser
    ? `Signed in as ${currentUser.email}`
    : '';
  loadMovies();
  loadGames();
  loadShows();
}

function setAuthError(message) {
  const el = document.getElementById('auth-error');
  if (!message) {
    el.hidden = true;
    el.textContent = '';
    return;
  }
  el.hidden = false;
  el.textContent = message;
}

async function handleAuth() {
  setAuthError('');
  const email = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;

  if (!email || !password) {
    setAuthError('Email and password are required.');
    return;
  }

  try {
    const response = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setAuthError(data.error || 'Authentication failed');
      return;
    }

    currentUser = data;
    document.getElementById('auth-password').value = '';
    showApp();
  } catch (error) {
    console.error('Auth error:', error);
    setAuthError('Network error. Try again.');
  }
}

async function handleLogout() {
  try {
    await apiFetch('/auth/logout', { method: 'POST' });
  } catch (error) {
    console.error('Logout error:', error);
  }
  showAuth();
}

// ==================== LOAD FUNCTIONS ====================

async function loadMovies() {
  try {
    const response = await apiFetch('/movies');
    if (response.status === 401) {
      showAuth();
      return;
    }
    movies = await response.json();
    if (!Array.isArray(movies)) movies = [];

    const tbody = document.getElementById('movies-table-body');
    tbody.innerHTML = '';

    movies.forEach((movie) => {
      tbody.innerHTML += `
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
    });
  } catch (error) {
    console.error('Error loading movies:', error);
  }
}

async function loadGames() {
  try {
    const response = await apiFetch('/games');
    if (response.status === 401) {
      showAuth();
      return;
    }
    games = await response.json();
    if (!Array.isArray(games)) games = [];

    const tbody = document.getElementById('games-table-body');
    tbody.innerHTML = '';

    games.forEach((game) => {
      tbody.innerHTML += `
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
    });
  } catch (error) {
    console.error('Error loading games:', error);
  }
}

async function loadShows() {
  try {
    const response = await apiFetch('/shows');
    if (response.status === 401) {
      showAuth();
      return;
    }
    shows = await response.json();
    if (!Array.isArray(shows)) shows = [];

    const tbody = document.getElementById('shows-table-body');
    tbody.innerHTML = '';

    shows.forEach((show) => {
      tbody.innerHTML += `
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
    });
  } catch (error) {
    console.error('Error loading shows:', error);
  }
}

// ==================== FORM HANDLERS ====================

const addMovieForm = document.getElementById('add-movie-form');
if (addMovieForm) {
  addMovieForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (movies.length >= 10) {
      alert('Maximum of 10 movies reached!');
      return;
    }

    const newMovie = {
      title: document.getElementById('movie-title').value,
      genre: document.getElementById('movie-genre').value,
      year: document.getElementById('movie-year').value
    };

    try {
      const response = await apiFetch('/movies', {
        method: 'POST',
        body: JSON.stringify(newMovie)
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        addMovieForm.reset();
        loadMovies();
        alert('Movie added successfully!');
      } else {
        alert(data.error || 'Error adding movie');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Error adding movie');
    }
  });
}

const addGameForm = document.getElementById('add-game-form');
if (addGameForm) {
  addGameForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (games.length >= 10) {
      alert('Maximum of 10 games reached!');
      return;
    }

    const newGame = {
      title: document.getElementById('game-title').value,
      genre: document.getElementById('game-genre').value,
      year: document.getElementById('game-year').value
    };

    try {
      const response = await apiFetch('/games', {
        method: 'POST',
        body: JSON.stringify(newGame)
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        addGameForm.reset();
        loadGames();
        alert('Game added successfully!');
      } else {
        alert(data.error || 'Error adding game');
      }
    } catch (error) {
      console.error('Error adding game:', error);
      alert('Error adding game');
    }
  });
}

const addShowForm = document.getElementById('add-show-form');
if (addShowForm) {
  addShowForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (shows.length >= 10) {
      alert('Maximum of 10 shows reached!');
      return;
    }

    const newShow = {
      title: document.getElementById('show-title').value,
      genre: document.getElementById('show-genre').value,
      year: document.getElementById('show-year').value
    };

    try {
      const response = await apiFetch('/shows', {
        method: 'POST',
        body: JSON.stringify(newShow)
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        addShowForm.reset();
        loadShows();
        alert('Show added successfully!');
      } else {
        alert(data.error || 'Error adding show');
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
    const tabPane = e.target.closest('.tab-pane');
    const resource = tabPane.id;

    try {
      const response = await apiFetch(`/${resource}/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        if (resource === 'movies') loadMovies();
        else if (resource === 'games') loadGames();
        else if (resource === 'shows') loadShows();
        alert('Item deleted successfully!');
      } else {
        const data = await response.json().catch(() => ({}));
        alert(data.error || 'Error deleting item');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Error deleting item');
    }
  }
});

// Edit handlers
document.addEventListener('click', (e) => {
  if (e.target.textContent === 'Edit' && e.target.closest('#movies')) {
    const row = e.target.closest('tr');
    document.getElementById('edit-movie-id').value = row.cells[0].textContent.trim();
    document.getElementById('edit-movie-title').value = row.cells[1].textContent;
    document.getElementById('edit-movie-genre').value = row.cells[2].textContent;
    document.getElementById('edit-movie-year').value = row.cells[3].textContent;
    new bootstrap.Modal(document.getElementById('editMovieModal')).show();
  }

  if (e.target.textContent === 'Edit' && e.target.closest('#games')) {
    const row = e.target.closest('tr');
    document.getElementById('edit-game-id').value = row.cells[0].textContent.trim();
    document.getElementById('edit-game-title').value = row.cells[1].textContent;
    document.getElementById('edit-game-genre').value = row.cells[2].textContent;
    document.getElementById('edit-game-year').value = row.cells[3].textContent;
    new bootstrap.Modal(document.getElementById('editGameModal')).show();
  }

  if (e.target.textContent === 'Edit' && e.target.closest('#shows')) {
    const row = e.target.closest('tr');
    document.getElementById('edit-show-id').value = row.cells[0].textContent.trim();
    document.getElementById('edit-show-title').value = row.cells[1].textContent;
    document.getElementById('edit-show-genre').value = row.cells[2].textContent;
    document.getElementById('edit-show-year').value = row.cells[3].textContent;
    new bootstrap.Modal(document.getElementById('editShowModal')).show();
  }
});

document.getElementById('save-movie-edit').addEventListener('click', async () => {
  const id = document.getElementById('edit-movie-id').value;
  const updatedMovie = {
    title: document.getElementById('edit-movie-title').value,
    genre: document.getElementById('edit-movie-genre').value,
    year: document.getElementById('edit-movie-year').value
  };

  try {
    const response = await apiFetch(`/movies/${id}`, {
      method: 'PUT',
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

document.getElementById('save-game-edit').addEventListener('click', async () => {
  const id = document.getElementById('edit-game-id').value;
  const updatedGame = {
    title: document.getElementById('edit-game-title').value,
    genre: document.getElementById('edit-game-genre').value,
    year: document.getElementById('edit-game-year').value
  };

  try {
    const response = await apiFetch(`/games/${id}`, {
      method: 'PUT',
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

document.getElementById('save-show-edit').addEventListener('click', async () => {
  const id = document.getElementById('edit-show-id').value;
  const updatedShow = {
    title: document.getElementById('edit-show-title').value,
    genre: document.getElementById('edit-show-genre').value,
    year: document.getElementById('edit-show-year').value
  };

  try {
    const response = await apiFetch(`/shows/${id}`, {
      method: 'PUT',
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
