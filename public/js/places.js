function toggleAddPlaceForm() {
  const addForm = document.querySelector('.add-place-form');
  if (addForm.style.display === 'none' || addForm.style.display === '') {
    addForm.style.display = 'block';
  } else {
    addForm.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const deleteButtons = document.querySelectorAll('.delete-btn');
  const editPlaceButtons = document.querySelectorAll('.edit-place-btn');
  const editPlaceForm = document.getElementById('edit-place-form');
  const placeDetailsContainer = document.getElementById('place-details-container');
  let currentPlaceId = null;

  deleteButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
      const placeId = event.target.getAttribute('data-id');
      const confirmed = confirm('Are you sure you want to delete this place?');
      if (!confirmed) return;

      try {
        const response = await fetch(`/admin/delete-place/${placeId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          alert('Place item deleted successfully');
          window.location.reload();
        } else {
          const result = await response.json();
          alert(`Failed to delete place: ${result.error}`);
        }
      } catch (err) {
        console.error('Error deleting place:', err);
        alert('Error deleting place');
      }
    });
  });

  // Event listener for edit place buttons
  editPlaceButtons.forEach(button => {
    button.addEventListener('click', function () {
      const placeId = this.dataset.id;
      currentPlaceId = placeId;

      // Fetch place data from the table
      const row = this.closest('tr');
      const placeName = row.querySelector('td:nth-child(1)').innerText;
      const budget = row.querySelector('td:nth-child(6)').innerText;

      // Pre-fill the form with place data
      editPlaceForm.querySelector('#place-name').value = placeName;
      editPlaceForm.querySelector('#budget').value = budget;
      placeDetailsContainer.style.display = 'block';
      console.log(`Edit button clicked for placeId: ${placeId}`);
    });
  });

  // Event listener for edit place form submission
  editPlaceForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
        budget: editPlaceForm.querySelector('#budget').value,
    };

    try {
        const response = await fetch(`/admin/edit-place/${currentPlaceId}`, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Place updated successfully');
            placeDetailsContainer.style.display = 'none'; // Close modal after success
            window.location.reload(); // Reload page or update UI as needed
        } else {
            const result = await response.json();
            alert(`Failed to update place: ${result.error}`);
        }
    } catch (error) {
        console.error('Error updating place:', error);
        alert('Failed to update place');
    }
});

  // Close button for modal
  document.getElementById('close-btn3').addEventListener('click', function () {
    placeDetailsContainer.style.display = 'none';
  });
});
