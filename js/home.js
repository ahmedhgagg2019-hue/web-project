// el function di bt3ml check lw el function ccGetMovies mwgoda aw la2 lw mwgoda bt3mlha call w trga3 el result lw msh mwgoda trga3 array fady
function ccGetMoviesSafe() {
  if (typeof ccGetMovies === 'function') {
    return ccGetMovies();
  }
  return [];
}

// ----- slider el sewar -----
// el function di bt3ml init lel slider elly fe el home page
function ccInitHeroSlider() {
  var sliderEl = document.getElementById('heroSlider');
  var track = document.getElementById('sliderTrack');
  var dotsWrap = document.getElementById('sliderDots');
  var prevBtn = document.getElementById('sliderPrev');
  var nextBtn = document.getElementById('sliderNext');

  // lw el slider ely fe el home page msh mwgoda nrg3
  if (!sliderEl || !track) {
    return;
  }

  // ne5od bs el movies el 3andaha soura banner, w na5od awel 8 bs
  var allMovies = ccGetMoviesSafe();
  var slidesData = [];
  for (var i = 0; i < allMovies.length; i++) {
    if (
      typeof allMovies[i].banner === 'string' &&
      allMovies[i].banner.trim() !== ''
    ) {
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
      '<div class="slide" style="background-image:url(\'' +
      movie.banner +
      '\')">' +
      '<div class="slide-caption">' +
      '<h3>' +
      movie.title +
      '</h3>' +
      '<p>' +
      movie.genre +
      ' · ' +
      tag +
      '</p>' +
      '</div>' +
      '</div>';
  }
  track.innerHTML = slidesHtml;

  // nebni el dots wa7ed le kol slide
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
  // el function di bt3ml render lel slider, bta5od el index ely 3ayz tshow feh w t7ot el transform bta3 el track 3la 7sb el index, w kaman bt3ml highlight lel dot elly mwgoda feh
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
  // el function di bt3ml go to lel slide ely 3ayz tshow bta5od el index w t7ot el index 3la 7sb el slides length w bt3ml render
  function goTo(i) {
    index = (i + slides.length) % slides.length;
    render();
  }
  // el function di bt3ml go to lel slide ely ba3d el current index
  function next() {
    goTo(index + 1);
  }
  //  el function di bt3ml go to lel slide ely abl el current index
  function prev() {
    goTo(index - 1);
  }
  // el function di bt3ml start lel autoplay bt3ml stop lw mwgoda w b3d kda bt3ml setInterval lel next every 5 seconds
  function startAutoplay() {
    stopAutoplay();
    autoplayId = setInterval(next, 5000);
  }
  // el function di bt3ml stop lel autoplay, lw mwgoda bt3ml clearInterval
  function stopAutoplay() {
    if (autoplayId) {
      clearInterval(autoplayId);
    }
  }
  // el event listeners lel prev w next buttons, lw mwgoda, w kaman el mouse enter w leave 3la el slider 3shan ywa2f w ybda2 autoplay
  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      prev();
      startAutoplay();
    });
  }
  // el event listener lel next button, lw mwgoda
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      next();
      startAutoplay();
    });
  }
  // 3shan el autoplay ywa2f lw el mouse 3la el slider w ybda2 lw el mouse msh 3la el slider
  sliderEl.addEventListener('mouseenter', stopAutoplay);
  sliderEl.addEventListener('mouseleave', startAutoplay);

  render();
  startAutoplay();
}

// ----- grid el featured movies -----
// el function di bt3ml render lel featured movies grid, bta5od awel 4 movies mn el data w t7ot el html bta3hom fe el grid
function ccRenderFeaturedMovies() {
  var grid = document.getElementById('featuredMovies'); // select el grid ely feh el featured movies
  if (!grid) {
    return;
  }

  var allMovies = ccGetMoviesSafe();
  var movies = allMovies.slice(0, 8);

  var html = '';
  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];
    var upcoming = ccIsUpcoming(movie);

    var meta;
    if (upcoming) {
      meta = movie.genre + ' · Coming Soon';
    } else {
      var ratingText =
        movie.rating !== undefined && movie.rating !== null
          ? movie.rating
          : '—';
      meta = movie.genre + ' · ★ ' + ratingText;
    }

    var bookingAction;
    if (upcoming) {
      bookingAction =
        '<button type="button" class="btn btn-outline btn-sm" disabled>' +
        'Coming Soon' +
        '</button>';
    } else {
      bookingAction =
        '<a class="btn btn-primary btn-sm" href="booking.html?movieId=' +
        movie.id +
        '">Book Now</a>';
    }

    html +=
      '<article class="movie-card">' +
      '<div class="movie-poster" style="background-image:url(\'' +
      movie.poster +
      '\')"></div>' +
      '<div class="movie-info">' +
      '<h3>' +
      movie.title +
      '</h3>' +
      '<p class="movie-meta' +
      (upcoming ? ' upcoming' : '') +
      '">' +
      meta +
      '</p>' +
      bookingAction +
      '</div>' +
      '</article>';
  }

  grid.innerHTML = html;
}
// el function di bt3ml init lel home page, bt3ml call lel ccInitHeroSlider w ccRenderFeaturedMovies
document.addEventListener('DOMContentLoaded', function () {
  ccInitHeroSlider();
  ccRenderFeaturedMovies();

  var createAccountBtn = document.getElementById('heroCreateAccount');

  if (
    createAccountBtn &&
    typeof ccGetCurrentUser === 'function' &&
    ccGetCurrentUser()
  ) {
    createAccountBtn.style.display = 'none';
  }
});
