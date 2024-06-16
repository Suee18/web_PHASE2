function editProfile() {
  document.getElementById('email-value').contentEditable = true;
  document.getElementById('age-value').contentEditable = true;
  document.getElementById('gender-value').contentEditable = true;
  document.getElementById('nationality-value').contentEditable = true;
  document.getElementById('username-value').contentEditable = true;
  document.getElementById('birthday-value').contentEditable = true;
  document.getElementById('btnSave').disabled = false;
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