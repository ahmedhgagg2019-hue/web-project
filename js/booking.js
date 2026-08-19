// bt2ra el query param mn el URL (movieId)
function ccGetQueryParam(name) {
  var params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// state el booking page
var ccCurrentMovie = null;
var ccSelectedShowtime = null;
var ccSelectedSeats = [];

// el seats el mahgoza fe movie + showtime mo3ayan (mn kol el bookings, msh bs bta3et el user)
function ccGetBookedSeatsFor(movieId, showtime) {
  var bookings = ccGetBookings();
  var booked = [];
  for (var i = 0; i < bookings.length; i++) {
    if (bookings[i].movieId === movieId && bookings[i].showtime === showtime) {
      for (var j = 0; j < bookings[i].seats.length; j++) {
        booked.push(bookings[i].seats[j]);
      }
    }
  }
  return booked;
}

// bt3mel seat map (6 rows A-F, 8 seats fel row) w tmarki2 el mahgoza
function ccBuildSeatMapHtml(bookedSeats) {
  var rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  var seatsPerRow = 8;
  var html = '<div class="seat-map">';

  for (var r = 0; r < rows.length; r++) {
    html += '<div class="seat-row"><span class="row-label">' + rows[r] + '</span>';
    for (var n = 1; n <= seatsPerRow; n++) {
      var seatId = rows[r] + n;
      var isTaken = bookedSeats.indexOf(seatId) !== -1;
      html +=
        '<button type="button" class="seat' +
        (isTaken ? ' seat-taken' : '') +
        '" data-seat="' + seatId + '"' +
        (isTaken ? ' disabled' : '') +
        '>' + n + '</button>';
    }
    html += '</div>';
  }

  html += '</div>';
  return html;
}

// btcalculate w t3rd el total price w t2fel confirm button
function ccUpdateSummary() {
  var seatCountEl = document.getElementById('seatCount');
  var totalEl = document.getElementById('totalPrice');
  var seatListEl = document.getElementById('selectedSeatsList');
  var confirmBtn = document.getElementById('confirmBookingBtn');

  if (!seatCountEl) {
    return;
  }

  seatCountEl.textContent = ccSelectedSeats.length;
  var total = ccSelectedSeats.length * ccCurrentMovie.price;
  totalEl.textContent = 'EGP ' + total;
  seatListEl.textContent = ccSelectedSeats.length > 0 ? ccSelectedSeats.join(', ') : 'None selected';
  confirmBtn.disabled = !(ccSelectedShowtime && ccSelectedSeats.length > 0);
}

// bt3rad el showtime buttons w tzabat el click listeners
function ccRenderShowtimes(movie) {
  var wrap = document.getElementById('showtimeSelect');
  if (!movie.showtimes || movie.showtimes.length === 0) {
    wrap.innerHTML = '<p class="movie-meta">No showtimes scheduled yet for this movie.</p>';
    return;
  }

  var html = '';
  for (var i = 0; i < movie.showtimes.length; i++) {
    html += '<button type="button" class="showtime-btn" data-time="' + movie.showtimes[i] + '">' + movie.showtimes[i] + '</button>';
  }
  wrap.innerHTML = html;

  var buttons = wrap.querySelectorAll('.showtime-btn');
  for (var b = 0; b < buttons.length; b++) {
    buttons[b].addEventListener('click', function () {
      for (var x = 0; x < buttons.length; x++) {
        buttons[x].classList.remove('active');
      }
      this.classList.add('active');
      ccSelectedShowtime = this.getAttribute('data-time');
      ccSelectedSeats = [];
      document.getElementById('bookingMsg').textContent = '';
      ccRenderSeatMap();
      ccUpdateSummary();
    });
  }
}

// bt3rd el seat map bta3et el showtime el mokhtar
function ccRenderSeatMap() {
  var seatWrap = document.getElementById('seatMapWrap');

  if (!ccSelectedShowtime) {
    seatWrap.innerHTML = '<p class="movie-meta">Pick a showtime to select your seats.</p>';
    return;
  }

  var booked = ccGetBookedSeatsFor(ccCurrentMovie.id, ccSelectedShowtime);
  seatWrap.innerHTML = ccBuildSeatMapHtml(booked);

  var seatButtons = seatWrap.querySelectorAll('.seat:not(.seat-taken)');
  for (var i = 0; i < seatButtons.length; i++) {
    seatButtons[i].addEventListener('click', function () {
      var seatId = this.getAttribute('data-seat');
      var index = ccSelectedSeats.indexOf(seatId);

      if (index === -1) {
        ccSelectedSeats.push(seatId);
        this.classList.add('seat-selected');
      } else {
        ccSelectedSeats.splice(index, 1);
        this.classList.remove('seat-selected');
      }
      ccUpdateSummary();
    });
  }
}

// el main function ely bt3mel init lel booking page kolha
function ccInitBookingPage() {
  var main = document.getElementById('bookingMain');
  if (!main) {
    return;
  }

  var movieId = ccGetQueryParam('movieId');
  if (!movieId) {
    main.innerHTML =
      '<div class="container section"><p>No movie was selected. <a href="browse.html">Browse movies →</a></p></div>';
    return;
  }

  var movie = ccGetMovieById(movieId);
  if (!movie) {
    main.innerHTML =
      '<div class="container section"><p>We couldn\'t find that movie. <a href="browse.html">Browse movies →</a></p></div>';
    return;
  }

  var user = ccGetCurrentUser();
  if (!user) {
    main.innerHTML =
      '<div class="container section"><p>Please <a href="login.html">login</a> to book tickets for ' +
      movie.title + '.</p></div>';
    return;
  }

  ccCurrentMovie = movie;
  document.title = 'CinemaConnect · Book ' + movie.title;

  main.innerHTML =
    '<section class="container section booking-layout">' +
    '<div class="booking-movie-card">' +
    '<img src="' + movie.poster + '" alt="' + movie.title + ' poster" />' +
    '<div>' +
    '<h2>' + movie.title + '</h2>' +
    '<p class="movie-meta">' + movie.genre + ' · ' + movie.duration + ' min</p>' +
    '<p class="movie-meta">Ticket price: EGP ' + movie.price + '</p>' +
    '</div>' +
    '</div>' +
    '<div class="booking-form">' +
    '<h3>1. Select Showtime</h3>' +
    '<div class="showtime-select" id="showtimeSelect"></div>' +
    '<h3>2. Select Seats</h3>' +
    '<div id="seatMapWrap"><p class="movie-meta">Pick a showtime to select your seats.</p></div>' +
    '<div class="seat-legend">' +
    '<span><i class="legend-box available"></i> Available</span>' +
    '<span><i class="legend-box selected"></i> Selected</span>' +
    '<span><i class="legend-box taken"></i> Taken</span>' +
    '</div>' +
    '<div class="booking-summary">' +
    '<p>Seats selected: <strong id="seatCount">0</strong> (<span id="selectedSeatsList">None selected</span>)</p>' +
    '<p>Total Price: <strong id="totalPrice">EGP 0</strong></p>' +
    '<button type="button" class="btn btn-primary" id="confirmBookingBtn" disabled>Confirm Booking</button>' +
    '<p class="booking-msg" id="bookingMsg"></p>' +
    '</div>' +
    '</div>' +
    '</section>';

  ccRenderShowtimes(movie);

  document.getElementById('confirmBookingBtn').addEventListener('click', function () {
    confirmBookingBtn.disabled=true;
    if (!ccSelectedShowtime || ccSelectedSeats.length === 0) {
      return;
    }

    // check en el seats lessa mafeesh 7ad haghazha fel lahza el akhira
    var stillBooked = ccGetBookedSeatsFor(movie.id, ccSelectedShowtime);
    for (var i = 0; i < ccSelectedSeats.length; i++) {
      if (stillBooked.indexOf(ccSelectedSeats[i]) !== -1) {
        document.getElementById('bookingMsg').textContent =
          'Sorry, seat ' + ccSelectedSeats[i] + ' was just taken. Please choose again.';
        ccSelectedSeats = [];
        ccRenderSeatMap();
        ccUpdateSummary();
        return;
      }
    }

    var booking = {
      userId: user.id,
      movieId: movie.id,
      movieTitle: movie.title,
      poster: movie.poster,
      showtime: ccSelectedShowtime,
      seats: ccSelectedSeats.slice(),
      seatCount: ccSelectedSeats.length,
      pricePerSeat: movie.price,
      totalPrice: ccSelectedSeats.length * movie.price,
      status: 'Confirmed',
    };

    ccAddBooking(booking);
    window.location.href = 'bookings.html';
  });
}

document.addEventListener('DOMContentLoaded', ccInitBookingPage);
