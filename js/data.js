// el keys ely hanest5demha fel localStorage 3ashan ne7faz el data
var CC_KEYS = {
  MOVIES: 'cc_movies',
  USERS: 'cc_users',
  SESSION: 'cc_session',
  BOOKINGS: 'cc_bookings',
};

var CC_SEED_MOVIES = [
  {
    id: 'm1',
    title: 'Evil Dead Burn',
    genre: 'Horror',
    rating: 6.9,
    duration: 106,
    poster: 'images/posters/evil-dead-burn.jpg',
    banner: 'images/banners/evil-dead-burn-banner.jpg',
    description:
      'After losing her husband, a woman turns to her in-laws for comfort — only to watch them turn into deadites one by one, forcing her to fight for survival.',
    releaseDate: '2026-07-24',
    showtimes: ['13:00', '16:30', '20:00', '22:45'],
    price: 120,
  },
  {
    id: 'm2',
    title: 'Insidious: Out of the Further',
    genre: 'Horror',
    duration: 107,
    poster: 'images/posters/insidious-out-of-the-further.jpg',
    banner: 'images/banners/insidious-6-banner.jpg',
    description:
      'A trio of stalkers drag a new family into the astral plane, revealing a chilling truth: the Further is starting to bleed into our world.',
    releaseDate: '2026-08-21',
    showtimes: ['14:00', '17:30', '20:15'],
    price: 110,
  },
  {
    id: 'm3',
    title: 'Scream 7',
    genre: 'Horror',
    rating: 5.8,
    duration: 111,
    poster: 'images/posters/scream-7.jpg',
    banner: 'images/banners/scream-7-banner.jpg',
    description:
      'A new Ghostface killer surfaces in the quiet town where Sidney Prescott rebuilt her life, and this time her own daughter becomes the target.',
    releaseDate: '2026-02-27',
    showtimes: ['13:15', '16:00', '19:30', '22:00'],
    price: 110,
  },
  {
    id: 'm4',
    title: 'Spider-Man: Brand New Day',
    genre: 'Action',
    rating: 7.8,
    duration: 150,
    poster: 'images/posters/spider-man-brand-new-day.jpg',
    banner: 'images/banners/spiderman-bnd-banner.jpg',
    description:
      'The world has forgotten Peter Parker ever existed, but he keeps protecting it anyway — until a threat he can barely see forces a change he may not be able to control.',
    releaseDate: '2026-07-31',
    showtimes: ['12:00', '15:30', '19:00', '22:15'],
    price: 150,
  },
  {
    id: 'm5',
    title: 'The Odyssey',
    genre: 'Adventure',
    rating: 8.6,
    duration: 165,
    poster: 'images/posters/the-odyssey.jpg',
    banner: 'images/banners/the-odyssey-banner.jpg',
    description:
      "Christopher Nolan's epic take on Homer's poem: after the Trojan War, Odysseus battles gods, monsters, and the sea itself on a perilous voyage back to Ithaca.",
    releaseDate: '2026-07-17',
    showtimes: ['13:00', '17:00', '21:00'],
    price: 160,
  },
  {
    id: 'm6',
    title: 'Avengers: Doomsday',
    genre: 'Action',
    duration: 170,
    poster: 'images/posters/avengers-doomsday.jpg',
    banner: 'images/banners/avengers-doomsday-banner.jpg',
    description:
      'Heroes from three different universes join forces against Doctor Doom in the biggest Avengers team-up yet.',
    releaseDate: '2026-12-18',
    showtimes: ['13:00', '16:45', '20:30'],
    price: 170,
  },
  {
    id: 'm7',
    title: 'Backrooms',
    genre: 'Horror',
    rating: 7.1,
    duration: 110,
    poster: 'images/posters/backrooms.jpg',
    banner: 'images/banners/backrooms-banner.jpg',
    description:
      "A therapist follows her missing patient through a strange doorway into an endless maze of liminal rooms that shouldn't exist.",
    releaseDate: '2026-05-29',
    showtimes: ['14:30', '17:45', '20:45'],
    price: 100,
  },
  {
    id: 'm8',
    title: 'Obsession',
    genre: 'Horror',
    rating: 7.4,
    duration: 108,
    poster: 'images/posters/obsession.jpg',
    banner: 'images/banners/obsession-banner.jpg',
    description:
      "A lonely music-store clerk breaks a mysterious novelty toy to win his crush's heart — and gets exactly what he wished for, at a horrifying price.",
    releaseDate: '2026-05-15',
    showtimes: ['13:30', '16:15', '19:15', '21:45'],
    price: 100,
  },
];

// movie release date 3ashan n3raf law el movie da upcoming aw la2
function ccIsUpcoming(movie) {
  if (!movie.releaseDate) {
    return false;
  }
  var today = new Date();
  var releaseDate = new Date(movie.releaseDate);
  if (releaseDate > today) {
    return true;
  }
  return false;
}

// admin account
var CC_SEED_ADMIN = {
  id: 'u_admin',
  name: 'Admin',
  email: 'admin@cinemaconnect.test',
  password: 'Admin@123',
  role: 'admin',
};

//el function deh bet3amel init lel data law mafeesh data metsayva fel localStorage
function ccInitData() {
  var storedMoviesText = localStorage.getItem(CC_KEYS.MOVIES);
  var storedMovies = storedMoviesText ? JSON.parse(storedMoviesText) : null;

  if (!Array.isArray(storedMovies)) {
    // law mafeesh data metsave3a abl keda ne7ot el seed data
    localStorage.setItem(CC_KEYS.MOVIES, JSON.stringify(CC_SEED_MOVIES));
  } else {
    // law feh data metsayva abl keda ne7ot el saved data 3ala el seed data, w ne7ot el saved data law feh updates
    var finalMovies = [];

    for (var i = 0; i < CC_SEED_MOVIES.length; i++) {
      var seedMovie = CC_SEED_MOVIES[i];
      var savedVersion = null;

      for (var j = 0; j < storedMovies.length; j++) {
        if (storedMovies[j].id === seedMovie.id) {
          savedVersion = storedMovies[j];
          break;
        }
      }

      var mergedMovie = {};
      for (var key in seedMovie) {
        mergedMovie[key] = seedMovie[key];
      }
      if (savedVersion) {
        for (var key2 in savedVersion) {
          mergedMovie[key2] = savedVersion[key2];
        }
      }
      finalMovies.push(mergedMovie);
    }

    // el movies el et3amlet add mn el admin page w msh mawgooda fel seed list hanseebha
    for (var k = 0; k < storedMovies.length; k++) {
      var isSeedMovie = false;
      for (var s = 0; s < CC_SEED_MOVIES.length; s++) {
        if (CC_SEED_MOVIES[s].id === storedMovies[k].id) {
          isSeedMovie = true;
          break;
        }
      }
      if (!isSeedMovie) {
        finalMovies.push(storedMovies[k]);
      }
    }
// save el final movies fel localStorage
    localStorage.setItem(CC_KEYS.MOVIES, JSON.stringify(finalMovies));
  }

  if (!localStorage.getItem(CC_KEYS.USERS)) {
    localStorage.setItem(CC_KEYS.USERS, JSON.stringify([CC_SEED_ADMIN]));
  }
  if (!localStorage.getItem(CC_KEYS.BOOKINGS)) {
    localStorage.setItem(CC_KEYS.BOOKINGS, JSON.stringify([]));
  }
}
ccInitData();

// ---- functions bta3et el movies ----
// get el movies mn el localStorage
function ccGetMovies() {
  return JSON.parse(localStorage.getItem(CC_KEYS.MOVIES) || '[]');
}
// save el movies fel localStorage
function ccSaveMovies(movies) {
  localStorage.setItem(CC_KEYS.MOVIES, JSON.stringify(movies));
}
// get movie by id
function ccGetMovieById(id) {
  var movies = ccGetMovies();
  for (var i = 0; i < movies.length; i++) {
    if (movies[i].id === id) {
      return movies[i];
    }
  }
  return null;
}
// add movie
function ccAddMovie(movie) {
  var movies = ccGetMovies();
  if (!movie.id) {
    movie.id = 'm' + Date.now();
  }
  movies.push(movie);
  ccSaveMovies(movies);
  return movie;
}
// update movie
function ccUpdateMovie(id, updates) {
  var movies = ccGetMovies();
  var index = -1;
  for (var i = 0; i < movies.length; i++) {
    if (movies[i].id === id) {
      index = i;
      break;
    }
  }
  if (index === -1) {
    return null;
  }
  for (var key in updates) {
    movies[index][key] = updates[key];
  }
  ccSaveMovies(movies);
  return movies[index];
}
// delete movie
function ccDeleteMovie(id) {
  var movies = ccGetMovies();
  var newMovies = [];
  for (var i = 0; i < movies.length; i++) {
    if (movies[i].id !== id) {
      newMovies.push(movies[i]);
    }
  }
  ccSaveMovies(newMovies);
}

// ---- init el data ----
var ccMovies = ccGetMovies();

// ---- users w login/register ----
// get el users mn el localStorage
function ccGetUsers() {
  return JSON.parse(localStorage.getItem(CC_KEYS.USERS) || '[]');
}
// save el users fel localStorage
function ccSaveUsers(users) {
  localStorage.setItem(CC_KEYS.USERS, JSON.stringify(users));
}
// find user by email
function ccFindUserByEmail(email) {
  var users = ccGetUsers();
  for (var i = 0; i < users.length; i++) {
    if (users[i].email.toLowerCase() === email.toLowerCase()) {
      return users[i];
    }
  }
  return null;
}
// register user
function ccRegisterUser(data) {
  var existingUser = ccFindUserByEmail(data.email);
  if (existingUser) {
    return { ok: false, error: 'Email already registered.' };
  }

  var users = ccGetUsers();
  var newUser = {
    id: 'u_' + Date.now(),
    name: data.name,
    email: data.email,
    password: data.password,
    role: 'user',
  };
  users.push(newUser);
  ccSaveUsers(users);

  return { ok: true, user: newUser };
}
// login user
function ccLoginUser(email, password) {
  var user = ccFindUserByEmail(email);
  if (!user || user.password !== password) {
    return { ok: false, error: 'Invalid email or password.' };
  }
  localStorage.setItem(CC_KEYS.SESSION, JSON.stringify({ userId: user.id }));
  return { ok: true, user: user };
}
// update user
function ccUpdateUser(id, updates) {
  var users = ccGetUsers();
  var index = -1;

  for (var i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      index = i;
      break;
    }
  }

  if (index === -1) {
    return null;
  }

  if (updates.name !== undefined) {
    users[index].name = updates.name;
  }

  if (updates.email !== undefined) {
    users[index].email = updates.email;
  }

  ccSaveUsers(users);

  return users[index];
}
// logout user
function ccLogoutUser() {
  localStorage.removeItem(CC_KEYS.SESSION);
}
// get current logged in user
function ccGetCurrentUser() {
  var sessionText = localStorage.getItem(CC_KEYS.SESSION);
  if (!sessionText) {
    return null;
  }
  var session = JSON.parse(sessionText);
  var users = ccGetUsers();
  for (var i = 0; i < users.length; i++) {
    if (users[i].id === session.userId) {
      return users[i];
    }
  }
  return null;
}

// ---- bookings ----
// get el bookings mn el localStorage
function ccGetBookings() {
  return JSON.parse(localStorage.getItem(CC_KEYS.BOOKINGS) || '[]');
}
// save el bookings fel localStorage
function ccSaveBookings(bookings) {
  localStorage.setItem(CC_KEYS.BOOKINGS, JSON.stringify(bookings));
}
// add booking
function ccAddBooking(booking) {
  var bookings = ccGetBookings();
  booking.id = 'b_' + Date.now();
  booking.createdAt = new Date().toISOString();
  bookings.push(booking);
  ccSaveBookings(bookings);
  return booking;
}
// get bookings for user
function ccGetBookingsForUser(userId) {
  var bookings = ccGetBookings();
  var result = [];
  for (var i = 0; i < bookings.length; i++) {
    if (bookings[i].userId === userId) {
      result.push(bookings[i]);
    }
  }
  return result;
}
// cancel booking
function ccCancelBooking(bookingId) {
  var bookings = ccGetBookings();
  var newBookings = [];
  for (var i = 0; i < bookings.length; i++) {
    if (bookings[i].id !== bookingId) {
      newBookings.push(bookings[i]);
    }
  }
  ccSaveBookings(newBookings);
}
