// Inside flight.js or your JavaScript file
function toggleAddPlaceForm() {
    const addForm = document.querySelector('.add-place-form');
    if (addForm.style.display === 'none' || addForm.style.display === '') {
        addForm.style.display = 'block';
    } else {
        addForm.style.display = 'none';
    }
}
