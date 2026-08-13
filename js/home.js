
function ccGetMoviesSafe() {
  if (typeof ccGetMovies === 'function') {
    return ccGetMovies();
  }
  return [];
}

// ----- slider el sewar -----
function ccInitHeroSlider() {
  var sliderEl = document.getElementById('heroSlider');
  var track = document.getElementById('sliderTrack');
  var dotsWrap = document.getElementById('sliderDots');
  var prevBtn = document.getElementById('sliderPrev');
  var nextBtn = document.getElementById('sliderNext');

  if (!sliderEl || !track) {
    return;
  }

  // ne5od bs el movies el 3andaha soura banner, w na5od awel 8 bs
  var allMovies = ccGetMoviesSafe();
  var slidesData = [];
  for (var i = 0; i < allMovies.length; i++) {
    if (typeof allMovies[i].banner === 'string' && allMovies[i].banner.trim() !== '') {
      slidesData.push(allMovies[i]);
    }
    if (slidesData.length === 8) {
      break;
    }
  }

  if (slidesData.length === 0) {
    track.innerHTML = '';
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
    }
    return;
  }

  // nebni el html bta3 el slides
  var slidesHtml = '';
  for (var s = 0; s < slidesData.length; s++) {
    var movie = slidesData[s];
    var tag = ccIsUpcoming(movie) ? 'Coming Soon' : 'Now Showing';
    slidesHtml +=
      '<div class="slide" style="background-image:url(\'' + movie.banner + '\')">' +
      '<div class="slide-caption">' +
      '<h3>' + movie.title + '</h3>' +
      '<p>' + movie.genre + ' · ' + tag + '</p>' +
      '</div>' +
      '</div>';
  }
  track.innerHTML = slidesHtml;

  // nebni el dots, wa7ed le kol slide
  dotsWrap.innerHTML = '';
  for (var d = 0; d < slidesData.length; d++) {
    var dot = document.createElement('button');
    dot.className = 'slider-dot';
    dot.setAttribute('aria-label', 'Go to slide ' + (d + 1));
    dot.setAttribute('data-index', d);
    dot.addEventListener('click', function () {
      var clickedIndex = parseInt(this.getAttribute('data-index'), 10);
      goTo(clickedIndex);
    });
    dotsWrap.appendChild(dot);
  }

  var dots = dotsWrap.children;
  var slides = track.children;

  var index = 0;
  var autoplayId = null;

  function render() {
    track.style.transform = 'translateX(-' + index * 100 + '%)';
    for (var i = 0; i < dots.length; i++) {
      if (i === index) {
        dots[i].classList.add('active');
      } else {
        dots[i].classList.remove('active');
      }
    }
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    render();
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayId = setInterval(next, 5000);
  }

  function stopAutoplay() {
    if (autoplayId) {
      clearInterval(autoplayId);
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      prev();
      startAutoplay();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      next();
      startAutoplay();
    });
  }

  sliderEl.addEventListener('mouseenter', stopAutoplay);
  sliderEl.addEventListener('mouseleave', startAutoplay);

  render();
  startAutoplay();
}

// ----- grid el featured movies -----
function ccRenderFeaturedMovies() {
  var grid = document.getElementById('featuredMovies');
  if (!grid) {
    return;
  }

  var allMovies = ccGetMoviesSafe();
  var movies = allMovies.slice(0, 4);

  var html = '';
  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];
    var upcoming = ccIsUpcoming(movie);

    var meta;
    if (upcoming) {
      meta = movie.genre + ' · Coming Soon';
    } else {
      var ratingText = movie.rating ? movie.rating : '—';
      meta = movie.genre + ' · ★ ' + ratingText;
    }

    html +=
      '<article class="movie-card">' +
      '<div class="movie-poster" style="background-image:url(\'' + movie.poster + '\')"></div>' +
      '<div class="movie-info">' +
      '<h3>' + movie.title + '</h3>' +
      '<p class="movie-meta' + (upcoming ? ' upcoming' : '') + '">' + meta + '</p>' +
      '<a class="btn btn-primary btn-sm" href="browse.html">Book Now</a>' +
      '</div>' +
      '</article>';
  }

  grid.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function () {
  ccInitHeroSlider();
  ccRenderFeaturedMovies();
});
