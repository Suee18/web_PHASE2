// Arrays for dropdown options
const from = [
    "Select An Origin","Paris",
    "United States",
    "China", "India", "Brazil",
    "Indonesia", "Pakistan", "Nigeria",
    "Bangladesh", "Russia", "Mexico",
    "Japan", "Ethiopia", "Philippines",
    "Vietnam", "Germany", "Iran", "Turkey",
    "Thailand", "Saudi-Arabia"
];

const governorates = [
    "Select A Destination",
    "Dakahlia",
    "Red Sea",
    "Beheira",
    "Fayoum",
    "Gharbia",
    "Alexandria",
    "Ismailia",
    "Giza",
    "Menufia",
    "Minya",
    "Cairo",
    "Qalyubia",
    "Luxor",
    "New Valley",
    "Suez",
    "Sharqia",
    "Aswan",
    "Asyut",
    "Port Said",
    "Sinai",
    "Matruh",
    "Sohag"
];

// Variables to hold selected values
let selectedPackage = "";
let fromLocation = "";
let toLocation = "";
let numPeople = 0;
let checkInDate = "";
let checkOutDate = "";
let budget = "";
let numAdults = 0;
let numChildren = 0;
let numRooms = 0;
let hotelPackage = "";
let cardNumber = "";
let cardHolder = "";
let expMonth = "";
let expYear = "";
let cvv = "";

// Object to store interests
const interests = {
    "entertainment_area": { "value1": false, "value2": false },
    "historical_area": { "value1": false, "value2": false },
    "religious_area": { "value1": false, "value2": false },
    "sea_area": { "value1": false, "value2": false },
    "natural_area": { "value1": false, "value2": false }
};

function isStep2Valid() {
    const fromValue = $('#from-list').val();
    const toValue = $('#governorates-list').val();
    const monthValue = $('.month-input').val();
    const yearValue = $('.year-input').val();

    return (fromValue !== "" && toValue !== "" && monthValue !== "" && yearValue !== "");
}

function selectPackage(packageId) {
    selectedPackage = packageId;
    console.log("Selected Package: ", selectedPackage);
    document.querySelectorAll(".package button").forEach(btn => {
        btn.dataset.selected = "false";
        btn.classList.remove("selected");
    });

    const selectedBtn = document.getElementById("package" + packageId).querySelector("button");
    selectedBtn.dataset.selected = "true";
    selectedBtn.classList.add("selected");

   // Disable Step 2 (Hotel Details) for packageId 1 and 2
   if (packageId == 1 || packageId == 2) {
    $('.hotel').css({
        'pointer-events': 'none',
        'background-color': 'lightgray',
        'color': 'gray' // Change text color to gray
    });
    $('.hotel input, .hotel select').prop('disabled', true).css({
        'background-color': 'lightgray',
        'color': 'gray' // Change text color to gray
    });
} else {
    // Enable Step 2 (Hotel Details) for other packages
    $('.hotel').css({
        'pointer-events': 'auto',
        'background-color': 'white',
        'color': 'black' // Change text color to black
    });
    $('.hotel input, .hotel select').prop('disabled', false).css({
        'background-color': 'white',
        'color': 'black' // Change text color to black
    });
}

   // Handle Step 4 (Visa Step) based on packageId
if (packageId == 2 || packageId == 3) {
    // Enable Step 4 (Visa Step)
    $('.step4').css({
        'pointer-events': 'auto',
        'background-color': 'white',
        'color': 'black' // Change text color to black
    });
    $('.step4 input, .step4 select').prop('disabled', false).css({
        'background-color': 'white',
        'color': 'black' // Change text color to black
    });
} else {
    // Disable Step 4 (Visa Step) for other packages
    $('.step4').css({
        'pointer-events': 'none',
        'background-color': 'lightgray',
        'color': 'gray' // Change text color to gray
    });
    $('.step4 input, .step4 select').prop('disabled', true).css({
        'background-color': 'lightgray',
        'color': 'gray' // Change text color to gray
    });
}


    // Additional handling based on packageId, if needed

    // Update Step 2 values after package selection
    updateStep2Values();
}

// Function to update Step 3 values (interests)
function updateStep3Values() {
    Object.keys(interests).forEach(category => {
        const radioButton1 = document.querySelector(`input[name='${category}'][value='value1']`);
        const radioButton2 = document.querySelector(`input[name='${category}'][value='value2']`);

        interests[category].value1 = radioButton1 ? radioButton1.checked : false;
        interests[category].value2 = radioButton2 ? radioButton2.checked : false;
    });

    console.log("Interests:", interests);
}

// Function to update Step 2 values (booking details)
function updateStep2Values() {
    fromLocation = document.getElementById("from-list").value;
    toLocation = document.getElementById("governorates-list").value;
    numPeople = document.getElementById("num-people").value;
    checkInDate = document.getElementById("check-in").value;
    checkOutDate = document.getElementById("check-out").value;
    budget = document.getElementById("budget").value;
    numAdults = document.getElementById("num-adults").value;
    numChildren = document.getElementById("num-children").value;
    numRooms = document.getElementById("num-room").value;
    hotelPackage = document.getElementById("h-package").value;

    // Validate check-in and check-out dates
    const today = new Date();
    const checkInDateObj = new Date(checkInDate);
    const checkOutDateObj = new Date(checkOutDate);

    // Check if check-in date is today or in the future
    if (checkInDateObj < today) {
        alert("Check-in date must be today or in the future.");
        document.getElementById("check-in").value = ""; // Clear the invalid date
        return;
    }

    // Check if check-out date is after check-in date
    if (checkOutDateObj <= checkInDateObj) {
        alert("Check-out date must be after the check-in date.");
        document.getElementById("check-out").value = ""; // Clear the invalid date
        return;
    }

    console.log("From Location: ", fromLocation);
    console.log("To Location: ", toLocation);
    console.log("Number of People: ", numPeople);
    console.log("Check-In Date: ", checkInDate);
    console.log("Check-Out Date: ", checkOutDate);
    console.log("Budget: ", budget);
    console.log("Number of Adults: ", numAdults);
    console.log("Number of Children: ", numChildren);
    console.log("Number of Rooms: ", numRooms);
    console.log("Hotel Package: ", hotelPackage);

    // Enable or disable next button based on validation
    if (isStep2Valid()) {
        $('.step2 .next').removeAttr('disabled');
    } else {
        $('.step2 .next').attr('disabled', 'disabled');
    }
}


// Function to update Step 4 values (payment details)
function updateStep4Values() {
    cardNumber = document.querySelector(".card-number-input").value;
    cardHolder = document.querySelector(".card-holder-input").value;
    expMonth = document.querySelector(".month-input").value;
    expYear = document.querySelector(".year-input").value;
    cvv = document.querySelector(".cvv-input").value;

    console.log("Card Number: ", cardNumber);
    console.log("Card Holder: ", cardHolder);
    console.log("Expiration Month: ", expMonth);
    console.log("Expiration Year: ", expYear);
    console.log("CVV: ", cvv);
}

// Document ready function
$(document).ready(function() {
    const governoratesList = $('#governorates-list');
    governorates.forEach(function(governorate) {
        governoratesList.append($('<option>', {
            value: governorate,
            text: governorate
        }));
    });

    const fromList = $('#from-list');
    from.forEach(function(fromItem) {
        fromList.append($('<option>', {
            value: fromItem,
            text: fromItem
        }));
    });

    // Event listeners for Step 3 (interests)
    Object.keys(interests).forEach(category => {
        $(`input[name='${category}']`).change(updateStep3Values);
    });

    // Event listeners for Step 1 (package selection)
    $(".package button").click(function() {
        selectPackage(this.parentElement.id.replace("package", ""));
    });

    // Event listeners for Step 2 (booking details)
    $("#from-list, #governorates-list, #num-people, #check-in, #check-out, #budget, #num-adults, #num-children, #num-room, #h-package")
        .on("change input", updateStep2Values);

    // Event listeners for Step 4 (payment details)
    $(".card-number-input, .card-holder-input, .month-input, .year-input, .cvv-input")
        .on("input change", updateStep4Values);

    // Initial updates
    updateStep2Values();
    updateStep4Values();

    function validatePayment() {

             // Check if selected package is Free (packageId 1)
    if (selectedPackage === "1") {
        return true; // Skip validation for Free package
    }
        const cardNumber = document.querySelector('.card-number-input').value.trim();
        const cardHolder = document.querySelector('.card-holder-input').value.trim();
        const expMonth = document.querySelector('.month-input').value;
        const expYear = document.querySelector('.year-input').value;
        const cvv = document.querySelector('.cvv-input').value.trim();
    
        // Check if any field is empty
        if (cardNumber === '' || cardHolder === '' || expMonth === 'month' || expYear === 'year' || cvv === '') {
            alert('Please fill out all fields.');
            return false;
        }
    
        // Validate card number (must be 16 digits)
        if (cardNumber.length !== 16 || isNaN(cardNumber)) {
            alert('Please enter a valid 16-digit card number.');
            return false;
        }
    
        // Validate card holder (cannot be empty)
        if (cardHolder === '') {
            alert('Please enter the card holder name.');
            return false;
        }
    
        // Validate expiration date
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // getMonth() returns zero-based month
        if (expYear < currentYear || (expYear == currentYear && expMonth < currentMonth)) {
            alert('Please select a valid expiration date.');
            return false;
        }
    
        // Validate CVV (must be 3 or 4 digits)
        if (cvv.length !== 3 && cvv.length !== 4 || isNaN(cvv)) {
            alert('Please enter a valid CVV.');
            return false;
        }
    
        // If all validations pass, proceed to the next step
        if (!validatePayment()) {
        return true;
        }
    }

    $('#msform').submit(function(event) {
        event.preventDefault(); // Prevent default form submission
        if (!validatePayment()) {
            return;
        }

        let packageType;
        if (selectedPackage === "1") {
            packageType = "Free";
        } else if (selectedPackage === "2") {
            packageType = "Standard";
        } else if (selectedPackage === "3") {
            packageType = "Premium";
        } else {
            packageType = "Unknown"; // Handle unexpected values
        }

        // Collect form data including userId, username, and avatar
        const formData = {
            package: packageType,
            from: $('#from-list').val(),
            destination: $('#governorates-list').val(),
            numPeople: $('#num-people').val(),
            checkIn: $('#check-in').val(),
            checkOut: $('#check-out').val(),
            budget: $('#budget').val(),
            numAdults: $('#num-adults').val(),
            numChildren: $('#num-children').val(),
            numRooms: $('#num-room').val(),
            hotelPackage: $('#h-package').val(),
            entertainment: $('input[name="entertainment_area"]:checked').val(),
            historical: $('input[name="historical_area"]:checked').val(),
            religious: $('input[name="religious_area"]:checked').val(),
            sea: $('input[name="sea_area"]:checked').val(),
            natural: $('input[name="natural_area"]:checked').val()
        };

        // AJAX POST request to submit form data
        $.ajax({
            type: 'POST',
            url: '/submit-form', // Change URL as needed
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(response) {
                alert('Form submitted successfully!');
                window.location.href = `loading`;
                console.log(response);
            },
            error: function(error) {
                alert('Error submitting form!');
                console.error(error);
            }
        });
    });

    console.log("Script loaded and initialized.");
});

