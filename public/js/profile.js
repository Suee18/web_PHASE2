//Ajax call to update profile info
function updateProfileDisplay(user) {
  document.getElementById('username-value').innerText = user.username;
  document.getElementById('userInfoUN').innerText = user.username;
  document.getElementById('email-value').innerText = user.email;
  document.getElementById('birthday-value').innerText = new Date(user.birthday).toLocaleDateString();
  document.getElementById('age-value').innerText = user.age;
  document.getElementById('gender-value').innerText = user.sex;
  document.getElementById('nationality-value').innerText = user.nationality;
  document.getElementById('finalAvatar').src = user.avatar;
}

function fetchProfileData() {
  $.ajax({
    url: '/profile/data',
    type: 'GET',
    success: function(user) {
      updateProfileDisplay(user);
    },
    error: function(error) {
      console.error('Error fetching profile data:', error);
    }
  });
}

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
  
  // Start 
    fetchProfileData();
  setInterval(fetchProfileData, 1000); // check for updates every 1 second

});

function editProfile() {
  document.getElementById('email-value').contentEditable = false;
  document.getElementById('age-value').contentEditable = false;
  document.getElementById('username-value').contentEditable = false;
  document.getElementById('birthday-select').disabled = false;
  document.getElementById('btnSave').disabled = false;
  document.getElementById('prev-arrow').disabled = false;
  document.getElementById('next-arrow').disabled = false;

  // Show selects for gender , nationality , birthdate ,username, email
  document.getElementById('gender-value').style.display = 'none';
  document.getElementById('gender-select').style.display = 'inline';

  document.getElementById('birthday-value').style.display = 'none';
  document.getElementById('birthday-select').style.display = 'inline';

  document.getElementById('nationality-value').style.display = 'none';
  document.getElementById('nationality-select').style.display = 'inline';

  document.getElementById('username-value').style.display = 'none';
document.getElementById('username-edit').style.display = 'inline';

document.getElementById('email-value').style.display = 'none';
document.getElementById('email-edit').style.display = 'inline';

document.getElementById('finalAvatar').style.display = 'none';
document.getElementById('avatar-image').style.display = 'block';
document.getElementById('prev-arrow').style.display = 'inline';
document.getElementById('next-arrow').style.display = 'inline';
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

function saveProfile() {
  // const email = document.getElementById('email-value').innerText;
  const birthday = document.getElementById('birthday-select').value;
  const age = document.getElementById('age-value').innerText;
  // const username = document.getElementById('username-value').innerText;
   const username = document.getElementById('username-edit').value;
   const email = document.getElementById('email-edit').value;
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

  document.getElementById('username-value').style.display = 'inline';
  document.getElementById('username-edit').style.display = 'none';

  document.getElementById('email-value').style.display = 'inline';
  document.getElementById('email-edit').style.display = 'none';

  document.getElementById('finalAvatar').style.display = 'block';
  document.getElementById('avatar-image').style.display = 'none';
  document.getElementById('prev-arrow').style.display = 'none';
  document.getElementById('next-arrow').style.display = 'none';

}



function validateUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // s
    return usernameRegex.test(username);
}

// Function to check if username exists in the database
async function checkUsernameExists(username) {
  const response = await fetch('/check-username', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
  });
  const data = await response.json();
  return data.exists;
}

// Function to validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to check if email exists in the database
async function checkEmailExists(email) {
  const response = await fetch('/check-email', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
  });
  const data = await response.json();
  return data.exists;
}

document.addEventListener("DOMContentLoaded", function() {
  const usernameInput = document.getElementById("username-edit");
  const usernameError = document.getElementById("username-error");
  const emailInput = document.getElementById("email-edit");
  const emailError = document.getElementById("email-error");

  usernameInput.addEventListener("input", async function() {
      if (validateUsername(usernameInput.value)) {
          const exists = await checkUsernameExists(usernameInput.value);
          if (exists) {
              usernameError.textContent = "Username already exists";
              document.getElementById('btnSave').disabled = true;
          } else {
              usernameError.textContent = "";
          }
      } else {
          usernameError.textContent = "Invalid username format";
          document.getElementById('btnSave').disabled = true;

      }
  });

  emailInput.addEventListener("input", async function() {
      if (validateEmail(emailInput.value)) {
          const exists = await checkEmailExists(emailInput.value);
          if (exists) {
              emailError.textContent = "Email already exists";
              document.getElementById('btnSave').disabled = true;
          } else {
              emailError.textContent = "";
          }
      } else {
          emailError.textContent = "Invalid email format";
          document.getElementById('btnSave').disabled = true;

      }
  });
});

//delete Account 
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
//Change password
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
