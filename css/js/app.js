const API_BASE = 'http://localhost:3000';

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