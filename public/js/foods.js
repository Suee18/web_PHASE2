document.addEventListener('DOMContentLoaded', () => {
  const deleteButtons = document.querySelectorAll('.delete-btn');
  const editButtons = document.querySelectorAll('.edit-btn');
  
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

  editButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          const foodId = event.target.getAttribute('data-id');
          const foodRow = event.target.closest('tr');
          const restaurantName = foodRow.children[0].innerText;
          const governorate = foodRow.children[1].innerText;
          const city = foodRow.children[2].innerText;
          const mealType = foodRow.children[3].innerText;
          const budget = foodRow.children[4].innerText;
          
          document.getElementById('editFoodId').value = foodId;
          document.getElementById('editRestaurantName').value = restaurantName;
          document.getElementById('editGovernorate').value = governorate;
          document.getElementById('editCity').value = city;
          document.getElementById('editMealType').value = mealType;
          document.getElementById('editBudget').value = budget;
          
          toggleEditFoodForm();
      });
  });
});

function toggleAddFoodForm() {
  const addFoodForm = document.querySelector('.add-food-form');
  addFoodForm.style.display = addFoodForm.style.display === 'block' ? 'none' : 'block';
}

function toggleEditFoodForm() {
  const editFoodForm = document.querySelector('.edit-food-form');
  editFoodForm.style.display = editFoodForm.style.display === 'block' ? 'none' : 'block';
}
