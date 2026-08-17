// el function di bt2ra el query param mn el URL (zay movieId)
function ccGetQueryParam(name) {
  var params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// bt3ml format lel date (2026-07-24 -> July 24, 2026)
function ccFormatDate(dateStr) {
  if (!dateStr) {
    return '—';
  }
  var d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    return dateStr;
  }
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  return d.toLocaleDateString('en-US', options);
}

// bt7awel el duration mn minutes le "Xh Ym"
function ccFormatDuration(minutes) {
  if (!minutes) {
    return '—';
  }
  var hours = Math.floor(minutes / 60);
  var mins = minutes % 60;
  return hours + 'h ' + mins + 'm';
}

// el main function ely bt3mel render lel movie details page kolha
function ccRenderMovieDetails() {
  var main = document.getElementById('detailsMain');
  if (!main) {
    return;
  }

  var movieId = ccGetQueryParam('movieId');

  if (!movieId) {
    main.innerHTML =
      '<div class="container section">' +
      '<p>No movie was selected. <a href="browse.html">Browse movies →</a></p>' +
      '</div>';
    return;
  }

  var movie = ccGetMovieById(movieId);

  if (!movie) {
    main.innerHTML =
      '<div class="container section">' +
      '<p>We couldn\'t find that movie. <a href="browse.html">Browse movies →</a></p>' +
      '</div>';
    return;
  }

  document.title = 'CinemaConnect · ' + movie.title;

  var upcoming = typeof ccIsUpcoming === 'function' ? ccIsUpcoming(movie) : false;
  var ratingText = movie.rating ? '★ ' + movie.rating : 'Not yet rated';
  var bannerStyle = movie.banner ? " style=\"background-image:url('" + movie.banner + "')\"" : '';

  // showtimes chips
  var showtimesHtml = '';
  if (movie.showtimes && movie.showtimes.length > 0) {
    for (var i = 0; i < movie.showtimes.length; i++) {
      showtimesHtml += '<span class="showtime-chip">' + movie.showtimes[i] + '</span>';
    }
  } else {
    showtimesHtml = '<p class="movie-meta">No showtimes scheduled yet.</p>';
  }

  var html =
    '<section class="details-banner"' + bannerStyle + '>' +
    '<div class="details-banner-overlay"></div>' +
    '</section>' +
    '<section class="container details-body">' +
    '<div class="details-poster">' +
    '<img src="' + movie.poster + '" alt="' + movie.title + ' poster" />' +
    '</div>' +
    '<div class="details-info">' +
    '<p class="eyebrow">' + movie.genre + (upcoming ? ' · Coming Soon' : ' · Now Showing') + '</p>' +
    '<h1>' + movie.title + '</h1>' +
    '<div class="details-meta-row">' +
    '<span>' + ratingText + '</span>' +
    '<span>' + ccFormatDuration(movie.duration) + '</span>' +
    '<span>Release: ' + ccFormatDate(movie.releaseDate) + '</span>' +
    '</div>' +
    '<p class="details-desc">' + movie.description + '</p>' +
    '<div class="details-showtimes">' +
    '<h3>Showtimes</h3>' +
    '<div class="showtime-list">' + showtimesHtml + '</div>' +
    '</div>' +
    '<div class="details-price">Ticket price: <strong>EGP ' + movie.price + '</strong></div>' +
    '<a class="btn btn-primary" href="booking.html?movieId=' + movie.id + '">Book Now</a>' +
    '</div>' +
    '</section>' +
    '<section class="container section trailer-section">' +
    '<h3>Trailer</h3>' +
    '<div class="trailer-wrap">' +
    '<video controls preload="metadata" poster="' + movie.poster + '" id="trailerVideo">' +
    '<source src="video/' + movie.id + '.mp4" type="video/mp4" />' +
    '</video>' +
    '<p class="trailer-fallback hidden" id="trailerFallback">Trailer not available yet.</p>' +
    '</div>' +
    '</section>';

  main.innerHTML = html;

  // law el video file msh mawgood, nekhabeeh w nwarih el fallback message badalo
  var video = document.getElementById('trailerVideo');
  var fallback = document.getElementById('trailerFallback');
  if (video && fallback) {
    video.addEventListener('error', function () {
      video.classList.add('hidden');
      fallback.classList.remove('hidden');
    });
  }
}

document.addEventListener('DOMContentLoaded', ccRenderMovieDetails);
