$(document).ready(function() {
    function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  
    // Retrieve values from URL query parameters
    var packageNumber = getParameterByName('package');
    var destination = getParameterByName('destination');
    var numPeople = getParameterByName('numPeople');
    var checkIn = getParameterByName('checkIn');
    var checkOut = getParameterByName('checkOut');
    var budget = getParameterByName('budget');
    var numAdults = getParameterByName('numAdults');
    var numChildren = getParameterByName('numChildren');
    var numRooms = getParameterByName('numRooms');
    var hotelPackage = getParameterByName('hotelPackage');
  
    // Print values to console for verification
    console.log("Package Number:", packageNumber);
    console.log("Destination:", destination);
    console.log("Number of People:", numPeople);
    console.log("Check-In Date:", checkIn);
    console.log("Check-Out Date:", checkOut);
    console.log("Budget:", budget);
    console.log("Number of Adults:", numAdults);
    console.log("Number of Children:", numChildren);
    console.log("Number of Rooms:", numRooms);
    console.log("Hotel Package:", hotelPackage);
  });
