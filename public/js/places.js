// Inside flight.js or your JavaScript file
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
    
    deleteButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
        const placeId = event.target.getAttribute('data-id');
        const confirmed = confirm('Are you sure you want to delete this place ?');
        if (!confirmed) return;
  
        try {
          const response = await fetch(`/admin/delete-place/${placeId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
  
          if (response.ok) {
            alert('place item deleted successfully');
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
  });
  
