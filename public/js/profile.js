function editProfile() {
  document.getElementById('email-value').contentEditable = true;
  document.getElementById('age-value').contentEditable = false;
  document.getElementById('username-value').contentEditable = true;
  document.getElementById('birthday-select').disabled = false;
  document.getElementById('btnSave').disabled = false;
  document.getElementById('prev-arrow').disabled = false;
  document.getElementById('next-arrow').disabled = false;

  // Show selects for gender and nationality
  document.getElementById('gender-value').style.display = 'none';
  document.getElementById('gender-select').style.display = 'inline';
  document.getElementById('birthday-value').style.display = 'none';
  document.getElementById('birthday-select').style.display = 'inline';
  document.getElementById('nationality-value').style.display = 'none';
  document.getElementById('nationality-select').style.display = 'inline';

  // Sync age entry with birthday year
  document.getElementById('age-value').addEventListener('input', updateBirthdayFromAge);
  document.getElementById('birthday-select').addEventListener('change', updateAgeFromBirthday);
}

function updateAgeFromBirthday() {
  const birthday = new Date(document.getElementById('birthday-select').value);
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  document.getElementById('age-value').innerText = age;
}
// Avatar scroller
document.addEventListener('DOMContentLoaded', (event) => {
  const images = [
    '/images/avatars/female_1.png',
    '/images/avatars/female_2.png',
    '/images/avatars/female_3.png',
    '/images/avatars/female_4.png',
    '/images/avatars/female_5.png',
    '/images/avatars/female_6.png',
    '/images/avatars/female_default.png',
    '/images/avatars/male_default.png',
    '/images/avatars/male_2.png',
    '/images/avatars/male_3.png',
    '/images/avatars/male_4.png',
    '/images/avatars/male_5.png',
    '/images/avatars/male_6.png',
    '/images/avatars/male_7.png',
  ];

  let currentIndex = 0;
  const avatarImage = document.getElementById('avatar-image');

  document.getElementById('prev-arrow').addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    avatarImage.src = images[currentIndex];
  });

  document.getElementById('next-arrow').addEventListener('click', () => {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    avatarImage.src = images[currentIndex];
  });
});

function saveProfile() {
  const email = document.getElementById('email-value').innerText;
  const birthday = document.getElementById('birthday-select').value;
  const age = document.getElementById('age-value').innerText;
  const username = document.getElementById('username-value').innerText;
  const avatar = document.getElementById('avatar-image').src;
  const gender = document.getElementById('gender-select').value;
  const nationality = document.getElementById('nationality-select').value;

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/profile/update', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      alert(response.message);
      updateProfileDisplay(response.user);
    }
  };
  xhr.send(JSON.stringify({
    username: username,
    birthday: birthday,
    email: email,
    age: age,
    gender: gender,
    nationality: nationality,
    avatar: avatar
  }));

  document.getElementById('btnSave').disabled = true;
  document.getElementById('email-value').contentEditable = false;
  document.getElementById('age-value').contentEditable = false;
  document.getElementById('username-value').contentEditable = false;
  document.getElementById('birthday-select').disabled = true;
  document.getElementById('prev-arrow').disabled = true;
  document.getElementById('next-arrow').disabled = true;
  document.getElementById('gender-select').style.display = 'none';
  document.getElementById('gender-value').style.display = 'inline';
  document.getElementById('nationality-value').style.display = 'inline';
  document.getElementById('nationality-select').style.display = 'none';
  document.getElementById('birthday-value').style.display = 'inline';
  document.getElementById('birthday-select').style.display = 'none';
}

function updateProfileDisplay(user) {
  document.getElementById('username-value').innerText = user.username;
  document.getElementById('email-value').innerText = user.email;
  document.getElementById('birthday-value').innerText = new Date(user.birthday).toLocaleDateString();
  document.getElementById('age-value').innerText = user.age;
  document.getElementById('gender-value').innerText = user.sex;
  document.getElementById('nationality-value').innerText = user.nationality;
  document.getElementById('avatar-image').src = user.avatar;
}

//email validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

document.getElementById('email-value').addEventListener('input', function () {
  const email = this.innerText;
  const emailError = document.getElementById('email-error');
  if (!validateEmail(email)) {
    emailError.textContent = 'Invalid email format';
    document.getElementById('btnSave').disabled = true;
  } else {
    // Check if the email already exists in the database
    fetch('/check-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.exists) {
        emailError.textContent = 'Email already in use';
        document.getElementById('btnSave').disabled = true;
      } else {
        emailError.textContent = '';
        document.getElementById('btnSave').disabled = false;
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
});
//username validation 
document.getElementById('username-value').addEventListener('input', function () {
  const username = this.innerText;
  const usernameError = document.getElementById('username-error');
  if (username.length < 3) {
    usernameError.textContent = 'Username must be at least 3 characters long';
    document.getElementById('btnSave').disabled = true;
  } else {
    // Check if the username already exists in the database
    fetch('/check-username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.exists) {
        usernameError.textContent = 'Username already in use';
        document.getElementById('btnSave').disabled = true;
      } else {
        usernameError.textContent = '';
        document.getElementById('btnSave').disabled = false;
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
});

function deleteProfile() {
  if (confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
    fetch('/delete-profile', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (response.ok) {
        alert('Profile deleted successfully');
        window.location.href = '/'; // Redirect
      } else {
        alert('Error deleting profile');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error deleting profile');
    });
  }
}


//change password
function showPasswordForm() {
  document.getElementById('password-form').style.display = 'block';
  document.getElementById('password-title').style.display = 'block';
  document.getElementById('btnShowPasswordForm').style.display = 'none';
  document.getElementById('btnChangePassword').style.display = 'inline';
  
}

function changePassword() {
  const currentPassword = document.getElementById('current-password').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  const currentPasswordError = document.getElementById('current-password-error');
  const newPasswordError = document.getElementById('new-password-error');
  const confirmPasswordError = document.getElementById('confirm-password-error');

  let valid = true;

  if (!currentPassword) {
    currentPasswordError.textContent = 'Current password is required';
    valid = false;
  } else {
    currentPasswordError.textContent = '';
  }

  if (newPassword.length < 8) {
    newPasswordError.textContent = 'New password must be at least 8 characters long';
    valid = false;
  } else {
    newPasswordError.textContent = '';
  }

  if (newPassword !== confirmPassword) {
    confirmPasswordError.textContent = 'Passwords do not match';
    valid = false;
  } else {
    confirmPasswordError.textContent = '';
  }

  if (valid) {
    fetch('/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentPassword: currentPassword,
        newPassword: newPassword,
      }),
    })
    .then(response => {
      if (response.ok) {
        alert('Password changed successfully');
        document.getElementById('password-form').style.display = 'none';
        document.getElementById('btnShowPasswordForm').style.display = 'inline-block';
      } else {
        response.json().then(data => {
          if (data.error === 'Incorrect current password') {
            currentPasswordError.textContent = 'Incorrect current password';
          } else {
            alert('Error changing password');
          }
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error changing password');
    });
  }
}
