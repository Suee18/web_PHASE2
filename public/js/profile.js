function editProfile() {
  document.getElementById('email-value').contentEditable = true;
  document.getElementById('age-value').contentEditable = true;
  document.getElementById('gender-value').contentEditable = true;
  document.getElementById('nationality-value').contentEditable = true;
  document.getElementById('username-value').contentEditable = true;
  document.getElementById('birthday-value').disabled = false;
  document.getElementById('btnSave').disabled = false;

  // Add event listeners
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

function saveProfile() {
  const email = document.getElementById('email-value').innerText;
  const birthday = document.getElementById('birthday-value').value;
  const age = document.getElementById('age-value').innerText;
  const gender = document.getElementById('gender-value').innerText;
  const nationality = document.getElementById('nationality-value').innerText;
  const username = document.getElementById('username-value').innerText;

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/profile/update', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      alert('Profile updated successfully');
      location.reload();
    }
  };
  xhr.send(JSON.stringify({
    username: username,
    birthday: birthday,
    email: email,
    age: age,
    gender: gender,
    nationality: nationality
  }));
  document.getElementById('btnSave').disabled = true;
}
