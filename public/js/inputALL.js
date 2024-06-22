

// Arrays for dropdown options
const from = [
    "Select An Origin",
    "United States",
    "China", "India", "Brazil",
    "Indonesia", "Pakistan", "Nigeria",
    "Bangladesh", "Russia", "Mexico",
    "Japan", "Ethiopia", "Philippines",
    "Vietnam", "Germany", "Iran", "Turkey",
    "Thailand", "Saudi-Arabia","Paris"
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

// Function to handle package selection
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

    // Form submission handling
    $('#msform').submit(function(event) {
        event.preventDefault(); // Prevent default form submission

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
