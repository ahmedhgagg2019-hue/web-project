// user info
var currentUser = null;

document.addEventListener('DOMContentLoaded', function () {
  // 1. bthal bynat el profile
  loadProfile();

  // 2. bnhadd bel ID
  var form = document.getElementById('profileForm');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // bynmn3 refresh
      saveProfile();
    });
  }

  // 3. byaaml edit
  var editBtn = document.getElementById('editProfileBtn');
  if (editBtn) {
    editBtn.addEventListener('click', function () {
      if (currentUser) {
        showEditForm(currentUser);
      }
    });
  }

  // 4. byaaml cancel
  var cancelBtn = document.getElementById('cancelEditBtn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function () {
      showViewMode();
    });
  }
});

// 1. loadProfile
function loadProfile() {
  currentUser = ccGetCurrentUser();

  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  renderProfile(currentUser);
}

// 2. renderProfile
function renderProfile(user) {
  var summaryName = document.getElementById('profileSummaryName');
  var summaryEmail = document.getElementById('profileSummaryEmail');
  var avatar = document.getElementById('profileAvatar');
  var role = document.getElementById('profileRole');
  var viewName = document.getElementById('viewName');
  var viewEmail = document.getElementById('viewEmail');

  if (summaryName) summaryName.textContent = user.name || 'CinemaConnect member';
  if (summaryEmail) summaryEmail.textContent = user.email || '';
  if (avatar) avatar.textContent = (user.name || 'C').charAt(0).toUpperCase();
  if (role) role.textContent = user.role === 'admin' ? 'Administrator' : 'Member';
  
  if (viewName) viewName.textContent = user.name || '';
  if (viewEmail) viewEmail.textContent = user.email || '';
}

// 3. showEditForm
function showEditForm(user) {
  var form = document.getElementById('profileForm');
  var viewDetails = document.getElementById('profileView');
  var detailsTitle = document.getElementById('detailsTitle');
  var nameInput = document.getElementById('profileName');
  var emailInput = document.getElementById('profileEmail');
  var message = document.getElementById('profileMessage');

  if (message) {
    message.textContent = '';
    message.className = 'form-message';
  }

  if (nameInput) nameInput.value = user.name || '';
  if (emailInput) emailInput.value = user.email || '';

  if (detailsTitle) detailsTitle.textContent = 'Edit your profile';
  if (viewDetails) viewDetails.classList.add('hidden');
  if (form) form.classList.remove('hidden');
}

//bnrg3 llscreen el asasya
function showViewMode() {
  var form = document.getElementById('profileForm');
  var viewDetails = document.getElementById('profileView');
  var detailsTitle = document.getElementById('detailsTitle');

  if (detailsTitle) detailsTitle.textContent = 'Account Overview';
  if (form) form.classList.add('hidden');
  if (viewDetails) viewDetails.classList.remove('hidden');
}


function saveProfile() {
  if (!currentUser) return;

  var nameInput = document.getElementById('profileName');
  var emailInput = document.getElementById('profileEmail');
  var message = document.getElementById('profileMessage');

  if (!message || !nameInput || !emailInput) return;

  message.className = 'form-message';
  message.textContent = '';

  var name = nameInput.value.trim();
  var email = emailInput.value.trim();

  // law mtktbsh haga
  if (!name || !email) {
    message.classList.add('error');
    message.textContent = 'Please enter your name and email address.';
    return;
  }

  // lw el email msh mwgod
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    message.classList.add('error');
    message.textContent = 'Please enter a valid email address.';
    return;
  }

  // law el email mwgod asln
  var existingUser = ccFindUserByEmail(email);
  if (existingUser && existingUser.id !== currentUser.id) {
    message.classList.add('error');
    message.textContent = 'This email is already in use by another account.';
    return;
  }

  // law 3ayz tghyr el user info
  var updatedUser = ccUpdateUser(currentUser.id, {
    name: name,
    email: email
  });

  if (!updatedUser) {
    message.classList.add('error');
    message.textContent = 'We could not update your profile. Please try again.';
    return;
  }

  currentUser = updatedUser;
  renderProfile(currentUser);

  if (typeof ccRenderNav === 'function') {
    ccRenderNav('profile');
  }

  // en kol haga tmam w nrg3 llscreen el asasya
  message.classList.add('success');
  message.textContent = 'Profile updated successfully.';

  showViewMode();
}
