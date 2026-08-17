// bt3mel format lel booking date (ISO string) le shakl a2raa lel eye
function ccFormatBookingDate(iso) {
  if (!iso) {
    return '—';
  }
  var d = new Date(iso);
  if (isNaN(d.getTime())) {
    return iso;
  }
  var dateText = d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  var timeText = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  return dateText + ' · ' + timeText;
}

// bt3mel el html card bta3et booking wa7ed
function ccRenderBookingCard(booking) {
  return (
    '<article class="booking-card" data-booking-id="' + booking.id + '">' +
    '<img class="booking-poster" src="' + booking.poster + '" alt="' + booking.movieTitle + ' poster" />' +
    '<div class="booking-details">' +
    '<h3>' + booking.movieTitle + '</h3>' +
    '<p class="movie-meta">Showtime: ' + booking.showtime + '</p>' +
    '<p class="movie-meta">Seats (' + booking.seatCount + '): ' + booking.seats.join(', ') + '</p>' +
    '<p class="movie-meta">Total Price: EGP ' + booking.totalPrice + '</p>' +
    '<p class="movie-meta">Booked on: ' + ccFormatBookingDate(booking.createdAt) + '</p>' +
    '<span class="booking-status">' + (booking.status || 'Confirmed') + '</span>' +
    '</div>' +
    '<button type="button" class="btn btn-outline btn-sm cancel-btn" data-booking-id="' + booking.id + '">Cancel Booking</button>' +
    '</article>'
  );
}

// el main function ely bt3mel render lel my bookings page kolha
function ccRenderBookingsPage() {
  var main = document.getElementById('bookingsMain');
  if (!main) {
    return;
  }

  var user = ccGetCurrentUser();
  if (!user) {
    main.innerHTML =
      '<div class="container section"><p>Please <a href="login.html">login</a> to see your bookings.</p></div>';
    return;
  }

  var bookings = ccGetBookingsForUser(user.id);

  if (bookings.length === 0) {
    main.innerHTML =
      '<div class="container section"><p>You have no bookings yet. <a href="browse.html">Browse movies →</a></p></div>';
    return;
  }

  // el ahdas booking el awel
  bookings.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  var html =
    '<div class="container section">' +
    '<div class="section-head"><div class="section-title">My Bookings</div></div>' +
    '<div class="bookings-list" id="bookingsList">';

  for (var i = 0; i < bookings.length; i++) {
    html += ccRenderBookingCard(bookings[i]);
  }

  html += '</div></div>';

  main.innerHTML = html;

  var cancelButtons = main.querySelectorAll('.cancel-btn');
  for (var c = 0; c < cancelButtons.length; c++) {
    cancelButtons[c].addEventListener('click', function () {
      var bookingId = this.getAttribute('data-booking-id');
      var confirmed = window.confirm('Are you sure you want to cancel this booking? This cannot be undone.');
      if (confirmed) {
        ccCancelBooking(bookingId);
        ccRenderBookingsPage();
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', ccRenderBookingsPage);
