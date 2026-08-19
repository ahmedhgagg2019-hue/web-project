var ccEditingId = null;

function ccInitAdmin() {
    var user = ccGetCurrentUser();
    if (!user || user.role !== 'admin') {
        window.location.href = 'index.html';
        return;
    }
    
    ccDrawAdminTable();
    document.getElementById("AddMovieBtn").addEventListener("click", () => ccOpenMovieModal()); // da arrow function 3ashan el click event mtt5dsh ka argument
    document.getElementById("movieForm").addEventListener("submit", ccSubmitMovieForm);
    document.getElementById("modalCloseBtn").addEventListener('click', ccCloseMovieModal);
}


function ccDrawAdminTable() {
    var movies = ccGetMovies();
    var tbody = document.getElementById("TableBody");
    if (!movies.length) {
        tbody.innerHTML = "<tr><td colspan='6' class='tag-empty'>No movies yet — add your first one.</td></tr>";
        return; // da 3ashan n2fl el function
    }
    tbody.innerHTML = movies.map(m => `
        <tr>
            <td>${m.title}</td>
            <td>${m.genre}</td>
            <td>${m.releaseDate}</td>
            <td class="rating-stars">${ccIsUpcoming(m) ? 'Upcoming' : (m.rating != null ? m.rating.toFixed(1) : '--')}</td>
            <td>${m.showtimes.length} slot${m.showtimes.length !== 1 ? 's' : ''}</td>
            <td>
                <button class="btn btn-ghost btn-sm" onclick="ccOpenMovieModal('${m.id}')">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="ccHandleDeleteMovie('${m.id}')">Delete</button>
            </td>
        </tr>`).join(''); // da bi3ady 3ala kol object fel array w bna3mel draw lel table
}

function ccOpenMovieModal(id) {
    ccEditingId = id || null;
    var form = document.getElementById("movieForm");
    form.reset();
    document.getElementById("modalTitle").textContent = id ? "Edit Movie" : "Add Movie";

    if (id) {
        var m = ccGetMovieById(id);
        form.title.value = m.title;
        form.genre.value = m.genre;
        form.releaseDate.value = m.releaseDate;
        form.duration.value = m.duration;
        form.rating.value = m.rating != null ? m.rating : '';
        form.description.value = m.description;
        form.showtimes.value = m.showtimes.join(', ');
        form.poster.value = m.poster;
        form.price.value = m.price;
        form.banner.value = m.banner;
    }
    document.getElementById("movieModal").classList.add("open");
}

function ccCloseMovieModal() {
    document.getElementById("movieModal").classList.remove("open");
}

function ccSubmitMovieForm(e) {
    e.preventDefault(); // e da el event w shelt el default actions 3ashan ana ely ba3mel el submit function
    var form = e.target; // el form howa target el submit event
    var info = {
        title: form.title.value.trim(),
        genre: form.genre.value.trim(),
        releaseDate: form.releaseDate.value,
        duration: parseInt(form.duration.value) || 1,
        rating: Math.max(0, Math.min(10, parseFloat(form.rating.value) || 0)), // || 0 3ashan momken ya3mel NaN
        description: form.description.value.trim(),
        showtimes: form.showtimes.value.split(',').map(s => s.trim()).filter(Boolean), // split ba3daha trim le ay whitespaces ba3daha filter any empty parts
        poster: form.poster.value.trim() || 'images/posters/evil-dead-burn.jpg',
        banner: form.banner.value.trim() || 'images/banners/evil-dead-burn-banner.jpg',
        price: parseFloat(form.price.value) || 1
    };

    if (!info.title || !info.genre || !info.showtimes.length) {
        alert("Title, genre, and at least one showtime are required.");
        return;
    }

    if (ccEditingId) {
        ccUpdateMovie(ccEditingId, info);
    } else {
        ccAddMovie(info);
    }
    ccCloseMovieModal();
    ccDrawAdminTable();
}

function ccHandleDeleteMovie(id) {
    if (!confirm('Delete this movie? This cannot be undone.')) {
        return;
    }
    ccDeleteMovie(id);
    ccDrawAdminTable();
}