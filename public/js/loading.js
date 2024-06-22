document.addEventListener("DOMContentLoaded", function() {
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
        } else {
          console.log(data);
          document.getElementById('result').innerText = `Matching flight found: 
            Origin: ${data.originCountry}, 
            Destination: ${data.destinationCountry}, 
            Date: ${new Date(data.date).toLocaleDateString()},
            Time: ${data.time}, 
            Price: ${data.price}, 
            Seats: ${data.seats}, 
            Company: ${data.company}`;
        }
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Error fetching flight data';
      });
  });