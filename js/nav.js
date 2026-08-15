// highlight el page ely e7na feeha
function ccRenderNav(activePage) {
  var navLinks = document.querySelectorAll('.nav-links a[data-page]');
  for (var i = 0; i < navLinks.length; i++) {
    if (navLinks[i].getAttribute('data-page') === activePage) {
      navLinks[i].classList.add('active');
    } else {
      navLinks[i].classList.remove('active');
    }
  }

  //el mobile menu
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });

    var linkItems = links.querySelectorAll('a');
    for (var j = 0; j < linkItems.length; j++) {
      linkItems[j].addEventListener('click', function () {
        links.classList.remove('open');
      });
    }
  }

  var user = null;
  if (typeof ccGetCurrentUser === 'function') {
    user = ccGetCurrentUser();
  }

  // button admin yeban law el user admin
  var adminLink = document.getElementById('adminNavLink');
  if (adminLink) {
    if (user && user.role === 'admin') {
      adminLink.classList.remove('hidden');
    } else {
      adminLink.classList.add('hidden');
    }
  }

  // Login/Register aw name el user + logout
  var cta = document.getElementById('navCta');
  if (cta) {
    if (user) {
      cta.innerHTML =
        '<a class="nav-user" href="profile.html">Hi, ' + user.name + '</a>' +
        '<button class="btn btn-outline btn-sm" id="navLogoutBtn" type="button">Logout</button>';

      document.getElementById('navLogoutBtn').addEventListener('click', function () {
        ccLogoutUser();
        window.location.href = 'index.html';
      });
    } else {
      cta.innerHTML =
        '<a class="btn btn-outline btn-sm" href="login.html">Login</a>' +
        '<a class="btn btn-primary btn-sm" href="register.html">Register</a>';
    }
  }
}
