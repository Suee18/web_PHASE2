document.addEventListener('DOMContentLoaded', function() {
    const editButtons = document.querySelectorAll('.edit-btn');
    const list = document.querySelectorAll(".navigation li");
    const editForm = document.getElementById('edit-form');
    const detailsContainer2 = document.getElementById('details-container2');
    let currentUserId = null;
  
    // Event listener for navigation links
    function activeLink() {
        list.forEach(item => {
            item.classList.remove("hovered");
        });
        this.classList.add("hovered");
    }
  
    list.forEach(item => item.addEventListener("mouseover", activeLink));
  
    // Event listener for edit buttons
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.dataset.id;
            currentUserId = userId;
  
            // Fetch user data from the table
            const row = this.closest('tr');
            const name = row.querySelector('td:nth-child(2)').innerText;
            const nationality = row.querySelector('td:nth-child(3)').innerText;
            const gender = row.querySelector('td:nth-child(4)').innerText;
            const subscription = row.querySelector('td:nth-child(5)').innerText;
  
            // Pre-fill the form with user data
            editForm.name.value = name;
            editForm.nationality.value = nationality;
            editForm.gender.value = gender;
            editForm.subscription.value = subscription === 'Admin' ? 'admin' : 'user';
            detailsContainer2.style.display = 'block';
        });
    });
  
    // Event listener for form submission
    editForm.addEventListener('submit', async function(e) {
        e.preventDefault();
  
        const formData = {
            username: editForm.name.value,
            nationality: editForm.nationality.value,
            gender: editForm.gender.value,
            isAdmin: editForm.subscription.value === 'admin'
        };
  
        try {
            const response = await fetch(`/users/${currentUserId}`, {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
  
            if (response.ok) {
                alert('User updated successfully');
                location.reload();
            } else {
                alert('Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user');
        }
    });
  });
  

  // Event listener for delete buttons
  deleteButtons.forEach(button => {
      button.addEventListener('click', function() {
          const userId = this.dataset.id;
          const detailsContainer = document.getElementById('details-container');
          detailsContainer.style.display = 'block';

          const yesBtn = document.getElementById('yes-btn');
          yesBtn.addEventListener('click', async function() {
              try {
                  const response = await fetch(`/users/${userId}`, {
                      method: 'DELETE'
                  });

                  if (response.ok) {
                      alert('User deleted successfully');
                      location.reload();
                  } else {
                      alert('Failed to delete user');
                  }
              } catch (error) {
                  console.error('Error deleting user:', error);
                  alert('Failed to delete user');
              }
          });
      });
  });

  // Close button for modals
  document.getElementById('close-btn').addEventListener('click', function() {
      document.getElementById('details-container').style.display = 'none';
  });

  document.getElementById('close-btn2').addEventListener('click', function() {
      document.getElementById('details-container2').style.display = 'none';
  });

