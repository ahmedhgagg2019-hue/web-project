// Handles Login / Register / Logout UI logic ONLY.
// All real authentication/session logic lives in data.js:
//   ccLoginUser(email, password)  -> { ok: true, user }  or { ok: false, error }
//   ccRegisterUser(data)          -> { ok: true, user }  or { ok: false, error }
//   ccLogoutUser()                -> clears the session
//   ccGetCurrentUser()            -> logged-in user object, or null

var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.addEventListener('DOMContentLoaded', function () {
  var loginForm = document.getElementById('loginForm');
  var registerForm = document.getElementById('registerForm');

  // Guests-only guard: if someone is already logged in and lands on
  // login.html/register.html anyway (e.g. typed the URL directly),
  // send them Home instead of showing the form.
  if (typeof ccGetCurrentUser === 'function' && ccGetCurrentUser()) {
    if (loginForm || registerForm) {
      window.location.href = 'index.html';
      return;
    }
  }

  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }

  if (registerForm) {
    registerForm.addEventListener('submit', handleRegisterSubmit);
  }

  // Landed here right after a successful registration (edge case where
  // auto-login failed) — show a friendly heads-up instead of silence.
  var params = new URLSearchParams(window.location.search);
  if (params.get('registered') === 'true') {
    var successBox = document.getElementById('loginSuccess');
    if (successBox) {
      successBox.textContent = 'Account created successfully! Please log in.';
      successBox.classList.remove('hidden');
    }
  }
});

// ---------- LOGIN ----------

function handleLoginSubmit(e) {
  e.preventDefault();

  var emailInput = document.getElementById('loginEmail');
  var passwordInput = document.getElementById('loginPassword');
  var errorBox = document.getElementById('loginError');
  var submitBtn = e.target.querySelector('button[type="submit"]');

  var email = emailInput.value.trim();
  var password = passwordInput.value;

  hideError(errorBox);

  if (!email || !password) {
    showError(errorBox, 'Please enter both email and password.');
    return;
  }

  if (!EMAIL_REGEX.test(email)) {
    showError(errorBox, 'Please enter a valid email address.');
    return;
  }

  setLoading(submitBtn, 'Logging in...');
  var result = ccLoginUser(email, password);

  if (result.ok) {
    window.location.href = 'index.html';
  } else {
    setLoading(submitBtn, 'Login', false);
    showError(errorBox, result.error || 'Invalid email or password.');
  }
}

// ---------- REGISTER ----------

function handleRegisterSubmit(e) {
  e.preventDefault();

  var nameInput = document.getElementById('registerName');
  var emailInput = document.getElementById('registerEmail');
  var passwordInput = document.getElementById('registerPassword');
  var confirmPasswordInput = document.getElementById('registerConfirmPassword');
  var errorBox = document.getElementById('registerError');
  var submitBtn = e.target.querySelector('button[type="submit"]');

  var name = nameInput.value.trim();
  var email = emailInput.value.trim();
  var password = passwordInput.value;
  var confirmPassword = confirmPasswordInput.value;

  hideError(errorBox);

  if (!name || !email || !password || !confirmPassword) {
    showError(errorBox, 'Please fill in all fields.');
    return;
  }

  if (!EMAIL_REGEX.test(email)) {
    showError(errorBox, 'Please enter a valid email address.');
    return;
  }

  if (password.length < 6) {
    showError(errorBox, 'Password must be at least 6 characters.');
    return;
  }

  if (password !== confirmPassword) {
    showError(errorBox, 'Passwords do not match.');
    return;
  }

  setLoading(submitBtn, 'Creating account...');
  var registerResult = ccRegisterUser({ name: name, email: email, password: password });

  if (!registerResult.ok) {
    setLoading(submitBtn, 'Register', false);
    showError(errorBox, registerResult.error || 'Registration failed. Please try again.');
    return;
  }

  // ccRegisterUser() only creates the account, it doesn't start a session
  // (only ccLoginUser() does that), so log the new user in right away
  // for a smoother experience straight after signing up.
  var loginResult = ccLoginUser(email, password);

  if (loginResult.ok) {
    window.location.href = 'index.html';
  } else {
    // Account was created but auto-login failed for some reason —
    // send them to login instead of leaving them stuck on the form,
    // with a flag so login.html can tell them why they're there.
    window.location.href = 'login.html?registered=true';
  }
}

// ---------- LOGOUT ----------
// Exposed globally so nav.js can wire it up to the logout button in the
// navbar (nav-cta) once that's built — not used on this page itself.
function ccHandleLogout() {
  ccLogoutUser();
  window.location.href = 'index.html';
}

// ---------- HELPERS ----------

function showError(errorBox, message) {
  if (!errorBox) return;
  errorBox.textContent = message;
  errorBox.classList.remove('hidden');
}

function hideError(errorBox) {
  if (!errorBox) return;
  errorBox.textContent = '';
  errorBox.classList.add('hidden');
}

function setLoading(button, label, isLoading) {
  if (!button) return;
  if (isLoading === undefined) isLoading = true;
  button.disabled = isLoading;
  button.textContent = label;
}
