//  3ashan acheck biha in el-email maktoub sa7 (zay name@domain.com)
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.addEventListener('DOMContentLoaded', function () {
  var loginForm = document.getElementById('loginForm');
  var registerForm = document.getElementById('registerForm');

  // Law el-user 3amel Login el-ady (ya3ny registered w dakhel 3ala el-site)
  // w garb yfta7 page el-Login aw el-Register ydwyan, bnn2loh 3ala el-Home page (index.html)
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


  // ---------- SHOW SUCCESS MESSAGE AFTER REGISTER ----------
  // Law el-user gae mn el-register w el-URL feeh "?registered=true
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
  e.preventDefault();  // Bnmna3 elbrowser eno y3mel Refresh le elpage

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

  // Bn-khaly el-button Disabled w bn-ktb feeh "Logging in..."
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
  e.preventDefault();   // Bn-mna3 el-Refresh

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

  // Bn-khaly el-button Loading
  setLoading(submitBtn, 'Creating account...');

  // Bn-nady function el-register mn data.js
  var registerResult = ccRegisterUser({ name: name, email: email, password: password });

  if (!registerResult.ok) {
    setLoading(submitBtn, 'Register', false);
    showError(errorBox, registerResult.error || 'Registration failed. Please try again.');
    return;
  }

  // Auto-login: lma el-register y-nga7, bn-3mel login 3ala tool 3ashan n-sehel 3ala el-user
  var loginResult = ccLoginUser(email, password);

  if (loginResult.ok) {
    window.location.href = 'index.html';
  } else {

    // Law el-account it3mal bas el-auto-login feshil, bnn2loh le login.html ma3a parameter ?registered=true
    window.location.href = 'login.html?registered=true';
  }
}

// ---------- LOGOUT ----------

// Function global 3ashan el-navbar y-estakdemha lma el-user ydous Logout
function ccHandleLogout() {
  ccLogoutUser();
  window.location.href = 'index.html';  // byruh el home
}

// ---------- HELPERS ----------

//  3ashan tzher el-error box w tktb feeh elmessage
function showError(errorBox, message) {
  if (!errorBox) return;
  errorBox.textContent = message;
  errorBox.classList.remove('hidden');
}

//bakhfy elerror box
function hideError(errorBox) {
  if (!errorBox) return;
  errorBox.textContent = '';
  errorBox.classList.add('hidden');
}

// bghyr elbutton state (Disabled / Text / Loading).
function setLoading(button, label, isLoading) {
  if (!button) return;
  if (isLoading === undefined) isLoading = true;
  button.disabled = isLoading;
  button.textContent = label;
}
