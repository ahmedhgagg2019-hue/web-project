let allMovies = [];

const moviesGridEl = document.getElementById('moviesGrid');
const searchInputEl = document.getElementById('searchInput');
const genreFilterEl = document.getElementById('genreFilter');

function formatDuration(minutes) {
  if (!minutes) return '';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours}h ${mins}m`;
}

function loadMovies() {
  allMovies = ccGetMovies();

  fillGenreFilter(allMovies);
  renderMovies(allMovies);
}

function fillGenreFilter(movies) {
  const genres = [];

  movies.forEach((movie) => {
    if (movie.genre && !genres.includes(movie.genre)) {
      genres.push(movie.genre);
    }
  });

  genres.forEach((genre) => {
    const option = document.createElement('option');

    option.value = genre;
    option.textContent = genre;

    genreFilterEl.appendChild(option);
  });
}

function renderMovies(movies) {
  moviesGridEl.innerHTML = '';

  if (movies.length === 0) {
    moviesGridEl.innerHTML = "<p class='bm-no-results'>No movies found.</p>";
    return;
  }

  movies.forEach((movie) => {
    const card = document.createElement('article');
    card.className = 'movie-card';

    const upcoming = ccIsUpcoming(movie);

    let genreLine;

    if (upcoming) {
      genreLine = `${movie.genre} · Coming Soon`;
    } else {
      const ratingText =
        movie.rating !== null && movie.rating !== undefined
          ? movie.rating.toFixed(1)
          : '—';

      genreLine = `${movie.genre} · ★ ${ratingText}`;
    }

    const bookButton = upcoming
      ? `<span class="btn btn-primary btn-sm disabled">Coming Soon</span>`
      : `<a class="btn btn-primary btn-sm" href="booking.html?movieId=${movie.id}">Book Now</a>`;

    card.innerHTML = `
      <div
        class="movie-poster"
        style="background-image:url('${movie.poster}')"
      ></div>

      <div class="movie-info">
        <h3>${movie.title}</h3>

        <p class="movie-meta${upcoming ? ' upcoming' : ''}">
          ${genreLine}
        </p>

        <p class="movie-meta">
          ${formatDuration(movie.duration)} · ${movie.price} EGP
        </p>

        <div class="bm-card-actions">
          <a
            class="btn btn-outline btn-sm"
            href="movie-details.html?movieId=${movie.id}"
          >
            Details
          </a>

          ${bookButton}
        </div>
      </div>
    `;

    moviesGridEl.appendChild(card);
  });
}

function applyFilters() {
  const query = searchInputEl.value.toLowerCase().trim();
  const genre = genreFilterEl.value;

  let filtered = allMovies;

  if (genre !== 'all') {
    filtered = filtered.filter((movie) => movie.genre === genre);
  }

  if (query) {
    filtered = filtered.filter((movie) =>
      movie.title.toLowerCase().includes(query),
    );
  }

  renderMovies(filtered);
}

function searchMovies() {
  applyFilters();
}

function filterMovies() {
  applyFilters();
}

searchInputEl.addEventListener('input', searchMovies);
genreFilterEl.addEventListener('change', filterMovies);

document.addEventListener('DOMContentLoaded', loadMovies);
