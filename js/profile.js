// متغير حفظ بيانات المستخدم الحالي
var currentUser = null;

// تشغيل جلب البيانات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
  loadProfile();
});

// 1. loadProfile() -> تجيب الـ current user بـ ccGetCurrentUser()
function loadProfile() {
  currentUser = ccGetCurrentUser();

  if (!currentUser) {
    // توجيه المستخدم لصفحة الدخول لو مش عامل Login
    window.location.href = 'login.html';
    return;
  }

  renderProfile(currentUser);
}

// 2. renderProfile(user) -> تعرض بيانات المستخدم في الصفحة
function renderProfile(user) {
  var nameInput = document.getElementById('profileName');
  var emailInput = document.getElementById('profileEmail');
  var summaryName = document.getElementById('profileSummaryName');
  var summaryEmail = document.getElementById('profileSummaryEmail');
  var avatar = document.getElementById('profileAvatar');
  var role = document.getElementById('profileRole');

  if (nameInput) nameInput.value = user.name || '';
  if (emailInput) emailInput.value = user.email || '';
  if (summaryName) summaryName.textContent = user.name || 'CinemaConnect member';
  if (summaryEmail) summaryEmail.textContent = user.email || '';
  if (avatar) avatar.textContent = (user.name || 'C').charAt(0).toUpperCase();
  if (role) role.textContent = user.role === 'admin' ? 'Administrator' : 'Member';
}

// 3. showEditForm(user) -> تعرض الـ Edit Form وتملأه بالبيانات
function showEditForm(user) {
  // تظهر الفورم إذا كان فيه جزء مخفي أو تجهزه للتعديل
  var form = document.getElementById('profileForm');
  if (form) {
    form.style.display = 'block';
  }
  renderProfile(user);
}

// 4. saveProfile() -> تاخد البيانات الجديدة وتستدعي ccUpdateUser
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

  if (!name || !email) {
    message.classList.add('error');
    message.textContent = 'Please enter your name and email address.';
    return;
  }

  // تحديث البيانات بحظر الـ ID والـ Role (الاسم والإيميل فقط)
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
  message.classList.add('success');
  message.textContent = 'Profile updated successfully.';
}

// ربط الـ Submit بتاع الفورم بالدالة saveProfile
var form = document.getElementById('profileForm');
if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    saveProfile();
  });
}
