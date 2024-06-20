// Function to toggle display of the add food form
function toggleAddFoodForm() {
    const addFoodForm = document.querySelector('.add-food-form');
    if (addFoodForm.style.display === 'none' || addFoodForm.style.display === '') {
        addFoodForm.style.display = 'block';
    } else {
        addFoodForm.style.display = 'none';
    }
}

// Add event listener for form submission to add new food item
document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    
    deleteButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
        const foodId = event.target.getAttribute('data-id');
        const confirmed = confirm('Are you sure you want to delete this food item?');
        if (!confirmed) return;
  
        try {
          const response = await fetch(`/admin/delete-food/${foodId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
  
          if (response.ok) {
            alert('Food item deleted successfully');
            window.location.reload(); // Reload the page to update the food items list
          } else {
            const result = await response.json();
            alert(`Failed to delete food item: ${result.error}`);
          }
        } catch (err) {
          console.error('Error deleting food item:', err);
          alert('Error deleting food item');
        }
      });
    });
  });
  