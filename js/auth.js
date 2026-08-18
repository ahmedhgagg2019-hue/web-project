document.addEventListener('DOMContentLoaded', () => {

  const loginContainer = document.getElementById('login-form-container');
  const registerContainer = document.getElementById('register-form-container');
  const showRegisterBtn = document.getElementById('show-register-btn');
  const showLoginBtn = document.getElementById('show-login-btn');

  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const loginError = document.getElementById('login-error');
  const registerError = document.getElementById('register-error');
  const logoutBtn = document.getElementById('logout-btn');

  if (showRegisterBtn) {
    showRegisterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      loginContainer.classList.add('hidden');
      registerContainer.classList.remove('hidden');
      clearErrors();
    });
  }

  if (showLoginBtn) {
    showLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      registerContainer.classList.add('hidden');
      loginContainer.classList.remove('hidden');
      clearErrors();
    });
  }

  function clearErrors() {
    if (loginError) {
      loginError.textContent = '';
      loginError.classList.add('hidden');
    }
    if (registerError) {
      registerError.textContent = '';
      registerError.classList.add('hidden');
    }
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;

      if (!email || !password) {
        showError(loginError, 'Please enter both email and password.');
        return;
      }

      if (typeof ccLoginUser !== 'function') {
        showError(loginError, 'System error: authentication service is unavailable.');
        return;
      }

      const result = ccLoginUser(email, password);

      if (result && result.success) {
        window.location.href = result.user && result.user.role === 'admin' ? 'admin.html' : 'index.html';
      } else {
        showError(loginError, (result && result.message) || 'Invalid email or password.');
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      const name = document.getElementById('register-name').value.trim();
      const email = document.getElementById('register-email').value.trim();
      const password = document.getElementById('register-password').value;
      const confirm = document.getElementById('register-confirm').value;

      if (!name || !email || !password || !confirm) {
        showError(registerError, 'Please fill in all fields.');
        return;
      }

      if (password !== confirm) {
        showError(registerError, 'Passwords do not match.');
        return;
      }

      if (password.length < 6) {
        showError(registerError, 'Password must be at least 6 characters long.');
        return;
      }

      if (typeof ccRegisterUser !== 'function') {
        showError(registerError, 'System error: registration service is unavailable.');
        return;
      }

      const result = ccRegisterUser({ name, email, password });

      if (result && result.success) {
        window.location.href = 'index.html';
      } else {
        showError(registerError, (result && result.message) || 'Registration failed.');
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof ccLogoutUser === 'function') {
        ccLogoutUser();
      }
      window.location.href = 'login.html';
    });
  }

  function showError(element, text) {
    if (element) {
      element.textContent = text;
      element.classList.remove('hidden');
    }
  }

});

function handleLogout() {
  if (typeof ccLogoutUser === 'function') {
    ccLogoutUser();
  }
  window.location.href = 'login.html';
}
