// متغير حفظ بيانات المستخدم الحالي
var currentUser = null;

document.addEventListener('DOMContentLoaded', function () {
  // 1. تحميل بيانات البروفايل عند فتح الصفحة
  loadProfile();

  // 2. ربط الـ Submit Event للـ Form
  var form = document.getElementById('profileForm');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      saveProfile();
    });
  }

  // 3. ربط زرار Edit Profile
  var editBtn = document.getElementById('editProfileBtn');
  if (editBtn) {
    editBtn.addEventListener('click', function () {
      if (currentUser) {
        showEditForm(currentUser);
      }
    });
  }

  // 4. ربط زرار Cancel
  var cancelBtn = document.getElementById('cancelEditBtn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function () {
      showViewMode();
    });
  }
});

// 1. loadProfile()
function loadProfile() {
  currentUser = ccGetCurrentUser();

  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  renderProfile(currentUser);
}

// 2. renderProfile(user)
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

// 3. showEditForm(user) -> تفعيل وضع التعديل وتعبئة الفورم
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

// دالة مساعدة للرجوع لوضع العرض (View Mode)
function showViewMode() {
  var form = document.getElementById('profileForm');
  var viewDetails = document.getElementById('profileView');
  var detailsTitle = document.getElementById('detailsTitle');

  if (detailsTitle) detailsTitle.textContent = 'Account Overview';
  if (form) form.classList.add('hidden');
  if (viewDetails) viewDetails.classList.remove('hidden');
}

// 4. saveProfile()
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

  // أ. التحقق من إن الحقول مش فاضية
  if (!name || !email) {
    message.classList.add('error');
    message.textContent = 'Please enter your name and email address.';
    return;
  }

  // ب. التحقق من صحة صيغة الإيميل (Email Regex Check)
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    message.classList.add('error');
    message.textContent = 'Please enter a valid email address.';
    return;
  }

  // ج. التحقق من تكرار الإيميل لدى مستخدم آخر
  var existingUser = ccFindUserByEmail(email);
  if (existingUser && existingUser.id !== currentUser.id) {
    message.classList.add('error');
    message.textContent = 'This email is already in use by another account.';
    return;
  }

  // د. تحديث بيانات المستخدم
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

  // هـ. تحديث الشريط العلوي (Navbar)
  if (typeof ccRenderNav === 'function') {
    ccRenderNav('profile');
  }

  // و. العودة لوضع العرض وتأكيد التحديث
  showViewMode();
}
