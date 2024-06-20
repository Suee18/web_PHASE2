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
    fetch('/change_password', {
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

// Attach event listener to password change button
document.getElementById('btnChangePassword').addEventListener('click', changePassword);
