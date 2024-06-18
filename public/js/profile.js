function editProfile() {
  document.getElementById('email-value').contentEditable = true;
  document.getElementById('age-value').contentEditable = true;
  // document.getElementById('gender-value').contentEditable = true;
  // document.getElementById('nationality-value').contentEditable = true;
  document.getElementById('username-value').contentEditable = true;
  document.getElementById('birthday-value').disabled = false;
  document.getElementById('btnSave').disabled = false;
  document.getElementById('prev-arrow').disabled = false;
  document.getElementById('next-arrow').disabled = false;

  //gender select
  document.getElementById('gender-value').style.display = 'none';
  document.getElementById('gender-select').style.display = 'inline';

  //birthday select
  document.getElementById('birthday-value').style.display = 'none';
  document.getElementById('birthday-select').style.display = 'inline';

  //nationality select
  document.getElementById('nationality-value').style.display = 'none';
  document.getElementById('nationality-select').style.display = 'inline';

  //to sync age entry with birthday year
  document.getElementById('age-value').addEventListener('input', updateBirthdayFromAge);
  document.getElementById('birthday-value').addEventListener('change', updateAgeFromBirthday);
}

function updateBirthdayFromAge() {
  const age = parseInt(document.getElementById('age-value').innerText, 10);
  if (!isNaN(age)) {
    const today = new Date();
    const birthYear = today.getFullYear() - age;
    const birthMonth = today.getMonth();
    const birthDay = today.getDate();

    const newBirthday = new Date(birthYear, birthMonth, birthDay);
    document.getElementById('birthday-value').value = newBirthday.toISOString().substring(0, 10);
  }
}

function updateAgeFromBirthday() {
  const birthday = new Date(document.getElementById('birthday-value').value);
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  document.getElementById('age-value').innerText = age;
}

//Avatar scroller
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
  // const gender = document.getElementById('gender-value').innerText;
  // const nationality = document.getElementById('nationality-value').innerText;
  const username = document.getElementById('username-value').innerText;
  const avatar = document.getElementById('avatar-image').src;
  const gender = document.getElementById('gender-select').value;
  const nationality = document.getElementById('nationality-select').value;

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/profile/update', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      alert('Profile updated successfully');
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
  document.getElementById('gender-value').contentEditable = false;
  document.getElementById('nationality-value').contentEditable = false;
  document.getElementById('username-value').contentEditable = false;
  document.getElementById('birthday-value').disabled = true;
  document.getElementById('prev-arrow').disabled = true;
  document.getElementById('next-arrow').disabled = true;
  document.getElementById('gender-select').style.display = 'none';
  document.getElementById('gender-value').style.display = 'inline';
  document.getElementById('nationality-value').style.display = 'inline';
  document.getElementById('nationality-select').style.display = 'none';
  document.getElementById('birthday-value').style.display = 'inline';
  document.getElementById('birthday-select').style.display = 'none';

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
        window.location.href = '/'; // Redirect to the homepage or login page
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