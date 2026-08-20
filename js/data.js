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
    id: 'm2',
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
    id: 'm3',
    title: 'Toy Story 5',
    genre: 'Animation',
    rating: 7.6,
    duration: 102,
    poster: 'images/posters/ToyStory5.jpg',
    description:
      'Woody, Buzz, Jessie and the toys face a new challenge when advanced technology threatens their place in Bonnie’s life.',
    releaseDate: '2026-06-19',
    showtimes: ['12:00', '15:00', '18:00', '21:00'],
    price: 120,
  },
  {
    id: 'm4',
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
    id: 'm5',
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
    id: 'm6',
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
    id: 'm7',
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
  {
    id: 'm8',
    title: 'Pinocchio',
    genre: 'Fantasy',
    rating: 7.0,
    duration: 120,
    poster: 'images/posters/pinocchio.jpg',
    description:
      'The classic tale of Pinocchio, a wooden puppet who dreams of becoming a real boy.',
    releaseDate: '2026-08-01',
    showtimes: ['13:00', '16:00', '19:00', '22:00'],
    price: 110,
  },
  {
    id: 'm9',
    title: '7 Dogs',
    genre: 'Action',
    rating: 7.0,
    duration: 110,
    poster: 'images/posters/7dogs.jpg',
    description:
      'An action-packed story following a group of seven dogs as they face an unexpected adventure together.',
    releaseDate: '2026-08-01',
    showtimes: ['13:00', '16:00', '19:00', '22:00'],
    price: 120,
  },
  {
    id: 'm10',
    title: 'Above and Below',
    genre: 'Drama',
    rating: 7.0,
    duration: 110,
    poster: 'images/posters/AboveAndBelow.jpg',
    description:
      'A dramatic story exploring the lives and struggles of people living on opposite sides of society.',
    releaseDate: '2026-08-01',
    showtimes: ['13:30', '16:30', '19:30', '22:30'],
    price: 110,
  },
  {
    id: 'm11',
    title: 'Detective Conan 29',
    genre: 'Animation',
    rating: 7.5,
    duration: 110,
    poster: 'images/posters/DetectiveConan29.jpg',
    description:
      'Detective Conan faces a new mystery that puts his investigation skills to the ultimate test.',
    releaseDate: '2026-04-10',
    showtimes: ['12:30', '15:30', '18:30', '21:30'],
    price: 120,
  },
  {
    id: 'm12',
    title: 'El Gawahergy',
    genre: 'Drama',
    rating: 7.0,
    duration: 110,
    poster: 'images/posters/ElGawahergy.jpg',
    description:
      'An Egyptian dramatic story filled with personal conflicts, ambition, and unexpected events.',
    releaseDate: '2026-08-01',
    showtimes: ['13:00', '16:00', '19:00', '22:00'],
    price: 110,
  },
  {
    id: 'm13',
    title: 'El Set Lamma',
    genre: 'Drama',
    rating: 7.0,
    duration: 105,
    poster: 'images/posters/ElSetLamma.jpg',
    description:
      'A woman launches a campaign to support women and confront difficult issues in married life.',
    releaseDate: '2026-08-27',
    showtimes: ['13:00', '16:00', '19:00', '22:00'],
    price: 110,
  },
  {
    id: 'm14',
    title: 'Khali Balk Mn Nafsak',
    genre: 'Drama',
    rating: 7.0,
    duration: 110,
    poster: 'images/posters/KhaliBalkMnNafsk.jpg',
    description:
      'An Egyptian story about relationships, choices, and the consequences of losing sight of yourself.',
    releaseDate: '2026-08-01',
    showtimes: ['13:30', '16:30', '19:30', '22:30'],
    price: 110,
  },
  {
    id: 'm15',
    title: 'Mahmoud El Tany',
    genre: 'Comedy',
    rating: 7.0,
    duration: 105,
    poster: 'images/posters/mahmoud_el_tany.jpg',
    description:
      'A comedy following Mahmoud through a series of unexpected situations and challenges.',
    releaseDate: '2026-08-01',
    showtimes: ['13:00', '16:00', '19:00', '22:00'],
    price: 110,
  },
  {
    id: 'm16',
    title: 'Moana',
    genre: 'Animation',
    rating: 7.5,
    duration: 110,
    poster: 'images/posters/moana.jpg',
    description:
      'Moana embarks on another exciting adventure across the ocean, facing new challenges along the way.',
    releaseDate: '2026-07-01',
    showtimes: ['12:00', '15:00', '18:00', '21:00'],
    price: 120,
  },
  {
    id: 'm17',
    title: 'Mutiny',
    genre: 'Action',
    rating: 7.0,
    duration: 95,
    poster: 'images/posters/mutiny.jpg',
    description:
      'Cole Reed is framed for the murder of his billionaire boss and must uncover an international conspiracy.',
    releaseDate: '2026-08-21',
    showtimes: ['13:00', '16:00', '19:00', '22:00'],
    price: 130,
  },
  {
    id: 'm18',
    title: 'Paw Patrol: The Dino Movie',
    genre: 'Animation',
    rating: 7.0,
    duration: 90,
    poster: 'images/posters/PawPatrolTheDinoMovie.jpg',
    description:
      'The heroic pups land on a dinosaur-filled island and take on exciting prehistoric rescue missions.',
    releaseDate: '2026-08-14',
    showtimes: ['12:00', '14:30', '17:00', '19:30'],
    price: 100,
  },
  {
    id: 'm19',
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
    id: 'm20',
    title: 'Sakr w Canaria',
    genre: 'Drama',
    rating: 7.0,
    duration: 110,
    poster: 'images/posters/SakrWCanaria.jpg',
    description:
      'An Egyptian story filled with drama, relationships, and unexpected turns.',
    releaseDate: '2026-08-01',
    showtimes: ['13:30', '16:30', '19:30', '22:30'],
    price: 110,
  },
  {
    id: 'm21',
    title: 'The End of Oak Street',
    genre: 'Thriller',
    rating: 7.0,
    duration: 100,
    poster: 'images/posters/TheEndOfOakStreet.jpg',
    description:
      'After a mysterious cosmic event transports their neighborhood to an unknown place, a family must fight to survive.',
    releaseDate: '2026-08-14',
    showtimes: ['13:00', '16:00', '19:00', '22:00'],
    price: 130,
  },
  {
    id: 'm22',
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
    id: 'm23',
    title: 'Asad',
    genre: 'Drama',
    rating: 7.0,
    duration: 110,
    poster: 'images/posters/asad.jpg',
    description:
      'An Egyptian drama exploring relationships, personal struggles, and unexpected choices.',
    releaseDate: '2026-08-01',
    showtimes: ['13:00', '16:00', '19:00', '22:00'],
    price: 110,
  },
  {
    id: 'm24',
    title: 'Coyote v. Acme',
    genre: 'Comedy',
    rating: 7.0,
    duration: 110,
    poster: 'images/posters/coyote_v_acme.jpg',
    description:
      'A comedy adventure following Wile E. Coyote as he takes his battle with Acme to court.',
    releaseDate: '2026-08-01',
    showtimes: ['13:00', '16:00', '19:00', '22:00'],
    price: 120,
  },
  {
    id: 'm25',
    title: 'Crawlers',
    genre: 'Horror',
    rating: 7.0,
    duration: 100,
    poster: 'images/posters/crawlers.jpg',
    description:
      'A terrifying story of survival against mysterious creatures that threaten everything in their path.',
    releaseDate: '2026-08-01',
    showtimes: ['14:00', '17:00', '20:00', '22:30'],
    price: 110,
  },
  {
    id: 'm26',
    title: 'Disclosure Day',
    genre: 'Sci-Fi',
    rating: 7.5,
    duration: 120,
    poster: 'images/posters/disclosure_day.jpg',
    description:
      'A mysterious event forces humanity to confront a shocking truth that could change the world forever.',
    releaseDate: '2026-08-01',
    showtimes: ['13:00', '16:30', '20:00', '22:30'],
    price: 130,
  },
  {
    id: 'm27',
    title: 'Dune: Part Three',
    genre: 'Sci-Fi',
    rating: 8.5,
    duration: 160,
    poster: 'images/posters/dune_part_three.jpg',
    description:
      'Paul Atreides faces the consequences of his choices as the struggle for Arrakis reaches its next chapter.',
    releaseDate: '2026-12-18',
    showtimes: ['13:00', '17:00', '21:00'],
    price: 160,
  },
  {
    id: 'm28',
    title: 'Family Business',
    genre: 'Comedy',
    rating: 7.0,
    duration: 105,
    poster: 'images/posters/FamilyBusiness.jpg',
    description:
      'A family comedy filled with unexpected situations, conflicts, and hilarious attempts to keep the business running.',
    releaseDate: '2026-08-01',
    showtimes: ['13:00', '16:00', '19:00', '22:00'],
    price: 110,
  },
  {
    id: 'm29',
    title: 'Ready or Not: Here I Come',
    genre: 'Horror',
    rating: 7.0,
    duration: 100,
    poster: 'images/posters/ready_or_not_here_i_come.jpg',
    description:
      'A deadly game turns into a terrifying fight for survival as a young woman discovers that the rules are far more dangerous than expected.',
    releaseDate: '2026-08-01',
    showtimes: ['14:00', '17:00', '20:00', '22:30'],
    price: 120,
  },
  {
    id: 'm30',
    title: 'Resident Evil',
    genre: 'Horror',
    rating: 7.5,
    duration: 120,
    poster: 'images/posters/resident_evil.jpg',
    description:
      'A terrifying new chapter in the Resident Evil universe as survivors face a deadly new threat.',
    releaseDate: '2026-08-01',
    showtimes: ['13:00', '16:30', '20:00', '22:30'],
    price: 130,
  },
  {
    id: 'm31',
    title: 'Star Wars: The Mandalorian & Grogu',
    genre: 'Action',
    rating: 8.0,
    duration: 120,
    poster: 'images/posters/star_wars_the_mandalorian_and_grogu.jpg',
    description:
      'The Mandalorian and Grogu embark on a new adventure across the galaxy, facing dangerous enemies and new challenges.',
    releaseDate: '2026-05-22',
    showtimes: ['13:00', '16:30', '20:00', '22:30'],
    price: 140,
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
  email: 'admin@gmail.com',
  password: 'Admin@123',
  role: 'admin',
};

// function to read array from localStorage
function ccReadArray(key) {
  try {
    var text = localStorage.getItem(key);

    if (!text) {
      return null;
    }

    var data = JSON.parse(text);

    if (Array.isArray(data)) {
      return data;
    }

    return null;
  } catch (error) {
    return null;
  }
}

// bte7ot el seed data mara wa7da bas law mafeesh data metsave3a
function ccInitData() {
  var storedMovies = ccReadArray(CC_KEYS.MOVIES);
  if (storedMovies === null) {
    localStorage.setItem(CC_KEYS.MOVIES, JSON.stringify(CC_SEED_MOVIES));
  }

  var storedUsers = ccReadArray(CC_KEYS.USERS);
  if (storedUsers === null) {
    localStorage.setItem(CC_KEYS.USERS, JSON.stringify([CC_SEED_ADMIN]));
  }

  var storedBookings = ccReadArray(CC_KEYS.BOOKINGS);
  if (storedBookings === null) {
    localStorage.setItem(CC_KEYS.BOOKINGS, JSON.stringify([]));
  }
}
ccInitData();

// ---- functions bta3et el movies ----
// get el movies mn el localStorage
function ccGetMovies() {
  return ccReadArray(CC_KEYS.MOVIES) || [];
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
    movie.id = 'm' + Date.now() + '_' + Math.floor(Math.random() * 1000);
  }
  movies.push(movie);
  ccSaveMovies(movies);
  return movie;
}

// update movie
function ccUpdateMovie(id, updates) {
  var movies = ccGetMovies();
  var index = -1; // index mbda2y be2ol eno ml2ash el movie
  for (var i = 0; i < movies.length; i++) {
    if (movies[i].id === id) {
      index = i;
      break;
    }
  }
  // law el movie msh mwgoda, nrg3 null
  if (index === -1) {
    return null;
  }
  // update el movie bta3na b el updates ely gayah
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
var ccMovies = ccGetMovies();

// ---- users w login/register ----
// get el users mn el localStorage
function ccGetUsers() {
  return ccReadArray(CC_KEYS.USERS) || [];
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

  var session;
  try {
    session = JSON.parse(sessionText);
  } catch (error) {
    localStorage.removeItem(CC_KEYS.SESSION);
    return null;
  }

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
  return ccReadArray(CC_KEYS.BOOKINGS) || [];
}
// save el bookings fel localStorage
function ccSaveBookings(bookings) {
  localStorage.setItem(CC_KEYS.BOOKINGS, JSON.stringify(bookings));
}
// add booking
function ccAddBooking(booking) {
  var bookings = ccGetBookings();
  booking.id = 'b_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
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
