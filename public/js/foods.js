document.addEventListener('DOMContentLoaded', () => {
  const editButtons = document.querySelectorAll('.edit-btn');

  editButtons.forEach(button => {
      button.addEventListener('click', () => {
          const foodId = button.getAttribute('data-id');
          // Fetch the food item details using the ID
          fetch(`/admin/food/${foodId}`)
              .then(response => response.json())
              .then(data => {
                  document.getElementById('editFoodId').value = data._id;
                  document.getElementById('editRestaurantName').value = data.restaurantName;
                  document.getElementById('editGovernorate').value = data.governorate;
                  document.getElementById('editCity').value = data.city;
                  document.getElementById('editMealType').value = data.mealType;
                  document.getElementById('editBudget').value = data.budget;
                  toggleEditFoodForm();
              })
              .catch(error => console.error('Error:', error));
      });
  });

  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
      button.addEventListener('click', () => {
          const foodId = button.getAttribute('data-id');
          if (confirm('Are you sure you want to delete this food item?')) {
              fetch(`/admin/delete-food/${foodId}`, {
                  method: 'DELETE'
              })
              .then(response => response.json())
              .then(data => {
                  if (data.success) {
                      // Reload the page or remove the deleted row from the table
                      location.reload();
                  } else {
                      alert('Error deleting food item.');
                  }
              })
              .catch(error => console.error('Error:', error));
          }
      });
  });

  document.querySelectorAll('.close-btn').forEach(button => {
      button.addEventListener('click', () => {
          const form = button.closest('form');
          form.style.display = 'none';
      });
  });
});

function toggleAddFoodForm() {
  const form = document.querySelector('.add-food-form');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function toggleEditFoodForm() {
  const form = document.querySelector('.edit-food-form');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
}
