document.addEventListener("DOMContentLoaded", function() {
  fetchFlightData();
});

function fetchFlightData() {
  fetch('/user/find-matching-flight')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      if (data.message) {
        console.log(data.message);
        document.getElementById('result').innerText = data.message;
      } else if (data.originCountry && data.destinationCountry) {
        // Flight data is present
        console.log(data);
        document.getElementById('result').innerText = `Matching flight found: 
          Origin: ${data.originCountry}, 
          Destination: ${data.destinationCountry}, 
          Date: ${new Date(data.date).toLocaleDateString()},
          Time: ${data.time}, 
          Price: ${data.price}, 
          Seats: ${data.seats}, 
          Company: ${data.company}`;
      } else {
        console.log('Unknown data received:', data);
        document.getElementById('result').innerText = 'Unknown data received';
      }

      fetchHotelData();
    })
    .catch(error => {
      console.error('Error fetching flight data:', error);
      window.location.href = 'a.html'; // Redirect on error
    });
}

function fetchHotelData() {
  fetch('/user/find-matching-hotel')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      if (data.message) {
        console.log(data.message);
        // Display message or handle as needed
      } else if (data.hotelName && data.pricePerNight) {
        // Hotel data is present
        console.log(data);
        document.getElementById('hotelResult').innerText = `Matching hotel found: 
          Hotel Name: ${data.hotelName},
          Price Per Night: ${data.pricePerNight}.package:${data.packageType}`;
      } else {
        console.log('Unknown data received:', data);
        document.getElementById('hotelResult').innerText = 'Unknown hotel data received';
      }

      if (data.packageType==="Free")
        {
          setTimeout(() => {
            window.location.href = 'a.html';
          }, 10000); // 10 seconds timeout
        }else{
          setTimeout(() => {
            window.location.href = 'a.html';
          }, 10000); 
        }
        }
      )
    .catch(error => {
      console.error('Error fetching hotel data:', error);
      setTimeout(() => {
        window.location.href = 'a.html';
      }, 10000); // 10 seconds timeout
    });
}
