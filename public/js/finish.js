function planInput() {
    const urlParams = new URLSearchParams(window.location.search);
    const packageTypeValue = urlParams.get('$package');
    const destination = urlParams.get('destination');
    const checkIn = urlParams.get('checkIn');
    const checkOut = urlParams.get('checkOut');
    const availableBudget = urlParams.get('budget');
    const numOfAdults = parseInt(urlParams.get('numAdults')) || 0;
    const numOfChildren = parseInt(urlParams.get('numChildren')) || 0;
    const numOfRooms = parseInt(urlParams.get('numRooms')) || 0;
    const hotelReservation = urlParams.get('hotelPackage');
    const selectedValues = urlParams.get('selectedValues');

    const packageTypeMapping = {
        '1': 'Free',
        '2': 'Standard',
        '3': 'Premium'
    };

    const packageType = packageTypeMapping[packageTypeValue];

    if (!packageType || !destination || !checkIn || !checkOut || !availableBudget) {
        alert('Please fill all required fields.');
        console.error('Missing required fields:', { packageType, destination, checkIn, checkOut, availableBudget });
        return;
    }

    const formData = {
        packageType,
        destination,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        availableBudget,
        hotelDetails: {
            numOfAdults,
            numOfChildren,
            numOfRooms,
            hotelReservation
        },
        interests: []
    };

    if (selectedValues) {
        try {
            const interests = JSON.parse(selectedValues);
            for (const day in interests) {
                const dateStr = interests[day].date;
                const date = new Date(dateStr);
                if (isNaN(date)) {
                    console.error(`Invalid date for day: ${day}, date: ${dateStr}`);
                    alert('Invalid date found in interests.');
                    return;
                }
                formData.interests.push({
                    date: date,
                    entertainment: interests[day].activities.includes('entertainment'),
                    historical: interests[day].activities.includes('historical'),
                    religious: interests[day].activities.includes('religious'),
                    sea: interests[day].activities.includes('sea'),
                    natural: interests[day].activities.includes('natural'),
                    day: interests[day].activities.includes('day'),
                    night: interests[day].activities.includes('night')
                });
            }
        } catch (e) {
            console.error('Error parsing selectedValues:', e);
            alert('An error occurred while processing your interests.');
            return;
        }
    }

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
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while saving the details.');
        console.log(formData);
    });
}





function submitFlightInput() {
    const storedFormData = JSON.parse(localStorage.getItem('formData'));
    if (!storedFormData) {
        alert('No form data found. Please complete the form.');
        return;
    }

    console.log("Submitting form data:", storedFormData); // Debugging line

    fetch('/submitFlightInput', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(storedFormData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
        } else {
            alert('Error submitting flight details');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the flight details.');
    });
}

$(document).ready(function () {
    // Handle finish button click
    $("#next-bt").click(function (event) {
        event.preventDefault();
        submitFlightInput();
    });
});
