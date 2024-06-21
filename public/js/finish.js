function planInput() {
    // Extract parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const packageType = urlParams.get('$package');
    const destination = urlParams.get('destination');
    const checkIn = urlParams.get('checkIn');
    const checkOut = urlParams.get('checkOut');
    const availableBudget = urlParams.get('budget');
    const numOfAdults = urlParams.get('numAdults');
    const numOfChildren = urlParams.get('numChildren');
    const numOfRooms = urlParams.get('numRooms');
    const hotelReservation = urlParams.get('hotelPackage');
    
    // Create an object with the extracted data
    const formData = {
        packageType,
        destination,
        checkIn,
        checkOut,
        availableBudget,
        numOfAdults,
        numOfChildren,
        numOfRooms,
        hotelReservation
    };

    // Send the data to the server using fetch
    fetch('/submitPlanInput', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        console.log(data);
        // Redirect to another page or show a success message
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while saving the details.');
        console.log(formData);
    });
}