// user.js
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const sideMenu = document.getElementById("side-menu");
    const menu = document.querySelector(".menu");
    const profile = document.querySelector(".profile");
    const sideMenuLinks = document.querySelectorAll('.side-menu-link');

    menuIcon.addEventListener("click", function () {
        sideMenu.classList.toggle("open");
        if (sideMenu.classList.contains("open")) {
            menu.style.marginLeft = "15rem";
            profile.style.display = "none";
        } else {
            menu.style.marginLeft = "0";
            profile.style.display = "block";
        }
    });

    sideMenuLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            // Remove 'active' class from all links
            sideMenuLinks.forEach(function (link) {
                link.classList.remove('active');
            });
            // Add 'active' class to the clicked link
            link.classList.add('active');
        });
    });
});
const governorates = [
    "Select A Destination",
    "Ad Daqahliyah (Dakahlia)",
    "Al Bahr al Ahmar (Red Sea)",
    "Al Buhayrah (Beheira)",
    "Al Fayyum (Fayoum)",
    "Al Gharbiyah (Gharbia)",
    "Al Iskandariyah (Alexandria)",
    "Al Isma'iliyah (Ismailia)",
    "Al Jizah (Giza)",
    "Al Minufiyah (Menufia)",
    "Al Minya (Minya)",
    "Al Qahirah (Cairo)",
    "Al Qalyubiyah (Qalyubia)",
    "Al Uqsur (Luxor)",
    "Al Wadi al Jadid (New Valley)",
    "As Suways (Suez)",
    "Ash Sharqiyah (Sharqia)",
    "Aswan",
    "Asyut",
    "Bani Suwayf (Beni Suef)",
    "Bur Sa'id (Port Said)",
    "Dumyat (Damietta)",
    "Janub Sina' (South Sinai)",
    "Kafr ash Shaykh (Kafr El Sheikh)",
    "Matruh",
    "Qina (Qena)",
    "Shamal Sina' (North Sinai)",
    "Suhaj (Sohag)"
];

$(document).ready(function () {
    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    var current = 1;
    var steps = $("fieldset").length;

    setProgressBar(current);

    $(".next").click(function () {
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
            step: function (now) {
                // for making fielset appear animation
                opacity = 1 - now;
                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({ 'opacity': opacity });
            },
            duration: 600
        });
        setProgressBar(++current);
    });

    $(".prev").click(function () {
        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
            step: function (now) {
                // for making fielset appear animation
                opacity = 1 - now;
                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({ 'opacity': opacity });
            },
            duration: 600
        });
        setProgressBar(--current);
    });

    function setProgressBar(curStep) {
        var percent = parseFloat(100 / steps) * curStep;
        percent = percent.toFixed();
        $(".progress-bar")
            .css("width", percent + "%")
    }

    $(".submit").click(function () {
        return false;
    })
});

function disableHotelElements() {
    //enable number of adults
    var numOfAdults = document.getElementById("num-adults");
    numOfAdults.style.pointerEvents = 'none';
    numOfAdults.style.opacity = '0.5';
    numOfAdults.style.cursor = 'not-allowed';
    numOfAdults.required = false;
    numOfAdults.disabled = true;
    //diable number of children
    var numOfChildren = document.getElementById("num-children");
    numOfChildren.style.pointerEvents = 'none';
    numOfChildren.style.opacity = '0.5';
    numOfChildren.style.cursor = 'not-allowed';
    numOfChildren.required = false;
    numOfChildren.disabled = true;
    //disable number of rooms
    var numOfRooms = document.getElementById("num-room");
    numOfRooms.style.pointerEvents = 'none';
    numOfRooms.style.opacity = '0.5';
    numOfRooms.style.cursor = 'not-allowed';
    numOfRooms.required = false;
    numOfRooms.disabled = true;
    //disable selection
    var selection = document.getElementById("h-package");
    selection.style.pointerEvents = 'none';
    selection.style.opacity = '0.5';
    selection.style.cursor = 'not-allowed';
    selection.required = false;
    selection.disabled = true;
}
function enableHotelElements() {
    //enable number of adults
    var numOfAdults = document.getElementById("num-adults");
    numOfAdults.style.pointerEvents = '';
    numOfAdults.style.opacity = '';
    numOfAdults.style.cursor = '';
    numOfAdults.required = true;
    numOfAdults.disabled = false;
    //enable number of children
    var numOfChildren = document.getElementById("num-children");
    numOfChildren.style.pointerEvents = '';
    numOfChildren.style.opacity = '';
    numOfChildren.style.cursor = '';
    numOfChildren.required = true;
    numOfChildren.disabled = false;
    //enable number of rooms
    var numOfRooms = document.getElementById("num-room");
    numOfRooms.style.pointerEvents = '';
    numOfRooms.style.opacity = '';
    numOfRooms.style.cursor = '';
    numOfRooms.required = true;
    numOfRooms.disabled = false;
    //enable selection
    var selection = document.getElementById("h-package");
    selection.style.pointerEvents = '';
    selection.style.opacity = '';
    selection.style.cursor = '';
    selection.required = true;
    selection.disabled = false;

}


//funcion handeling view of the hotel details for free/standard package
function disableHotelDetails() {
    var hotelElements = document.getElementsByClassName("hotel");

    //the loop is for setting the styling on all the elements with the same class name

    for (var i = 0; i < hotelElements.length; i++) {
        hotelElements[i].style.backgroundColor = "rgb(145, 145, 145)";
        hotelElements[i].style.opacity = "0.8";
    }
    //disable the inner elements
    disableHotelElements();
}

function enableHotelDetails() {
    var hotelElements = document.getElementsByClassName("hotel");

    //the loop is for setting the styling on all the elements with the same class name

    for (var i = 0; i < hotelElements.length; i++) {
        hotelElements[i].style.backgroundColor = "";
        hotelElements[i].style.opacity = "";
    }
    //disable the inner elements
    enableHotelElements();
}


function selectPackage(packageId) {
    if (packageId == 1) {
        disableHotelDetails();
        document.getElementById("package1").style.borderStyle = "solid";
        document.getElementById("package1").style.borderColor = "#eb7363a6";
        document.getElementById("package1").style.borderColor = "#eb7363a6";
        //disable add destination button----------------------------------
        var addDestination = document.getElementById("add-destination");
        addDestination.style.pointerEvents = 'none';
        addDestination.style.opacity = '0.5';
        addDestination.style.cursor = 'not-allowed';
        addDestination.style.background = "rgb(145, 145, 145)";
        addDestination.disabled = true;
        //removing other packages border-----------------------------------
        document.getElementById("package2").style.borderStyle = "none";
        document.getElementById("package3").style.borderStyle = "none";
    }
    else if (packageId == 2) {
        disableHotelDetails();
        document.getElementById("package2").style.borderStyle = "solid";
        document.getElementById("package2").style.borderColor = "#eb7363a6";
        document.getElementById("package2").style.borderColor = "#eb7363a6";
        //enable adding destintion button--------------------------------------
        document.getElementById("add-destination").style.pointerEvents = '';
        document.getElementById("add-destination").style.opacity = '';
        document.getElementById("add-destination").style.cursor = '';
        document.getElementById("add-destination").style.backgroundColor = '';
        document.getElementById("add-destination").style.disabled = false;
        //removing other packages border---------------------------------------
        document.getElementById("package1").style.borderStyle = "none";
        document.getElementById("package3").style.borderStyle = "none";
    }
    else if (packageId == 3) {
        enableHotelDetails();
        enableHotelElements();
        document.getElementById("package3").style.borderStyle = "solid";
        document.getElementById("package3").style.borderColor = "#eb7363a6";
        document.getElementById("package3").style.borderColor = "#eb7363a6";
        //enable adding destintion button-------------------------------------
        document.getElementById("add-destination").style.pointerEvents = '';
        document.getElementById("add-destination").style.opacity = '';
        document.getElementById("add-destination").style.cursor = '';
        document.getElementById("add-destination").style.backgroundColor = '';
        document.getElementById("add-destination").style.disabled = '';
        //removing other packages border--------------------------------------
        document.getElementById("package1").style.borderStyle = "none";
        document.getElementById("package2").style.borderStyle = "none";
    }
}


// adding space after every 4 digits in the card number field
function addSpacesToCardNumber() {
    var cardNumberInput = document.querySelector('.card-number-input');
    var cardNumber = cardNumberInput.value.replace(/\s/g, ''); // Remove existing spaces
    var formattedCardNumber = cardNumber.replace(/(\d{4})/g, '$1 '); // Add space after every 4 characters
    cardNumberInput.value = formattedCardNumber.trim(); // Update the input value
}


//check if the length is 16
function validateCardNumberLength() {
    var cardNumberInput = document.querySelector('.card-number-input');
    var cardNumber = cardNumberInput.value.replace(/\s/g, ''); // Remove spaces
    if (cardNumber.length !== 16) {
        alert('Error: Card number must be exactly 16 digits long.');
        // You can also display the error message next to the input field or any other preferred way.
    }
}

// allow only integers in the card number field
function allowOnlyIntegers(event) {
    var keyCode = event.keyCode;
    if ((keyCode < 48 || keyCode > 57) && keyCode !== 32) {
        event.preventDefault();
    }
}

// Function to validate CVV length and ensure it contains only integers
function validateCVV() {
    var cvvInput = document.querySelector('.cvv-input');
    var cvv = cvvInput.value.trim();
    if (cvv.length !== 3 || !(/^\d+$/.test(cvv))) {
        alert('Error: CVV must be 3 digits and contain only numbers.');
        // You can also display the error message next to the input field or any other preferred way.
    }
}

// adding event listeners to call the functions on appropriate events
document.querySelector('.card-number-input').addEventListener('input', addSpacesToCardNumber);
document.querySelector('.card-number-input').addEventListener('blur', validateCardNumberLength);
document.querySelector('.card-number-input').addEventListener('keypress', allowOnlyIntegers);
document.querySelector('.cvv-input').addEventListener('blur', validateCVV);
document.querySelector('.cvv-input').addEventListener('keypress', allowOnlyIntegers);

// Function to validate card holder name and ensure it contains no integers
function validateCardHolderName() {
    var cardHolderInput = document.querySelector('.card-holder-input');
    var cardHolderName = cardHolderInput.value.trim();
    if (/\d/.test(cardHolderName)) {
        alert('Error: Card holder name cannot contain numbers.');
        // You can also display the error message next to the input field or any other preferred way.
    }
}

// Add event listener to call the function on blur event for the card holder name input
document.querySelector('.card-holder-input').addEventListener('blur', validateCardHolderName);


//not working properly
function checkInValidation() {
    // Get the check-in date input element
    var checkInInput = document.getElementById('check-in');

    // Get the current date in the format "yyyy-mm-dd"
    var currentDate = new Date().toISOString().split('T')[0];

    // Set the min attribute of the check-in input to the current date
    checkInInput.setAttribute('min', currentDate);
    if (checkInInput < currentDate) {
        event.preventDefault();
        alert("You can't choose a date on the past");
    }
}

document.querySelectorAll.addEventListener('input', checkInValidation);


function populateGovernorates() {
    const selectElement = document.getElementById("governorates-list");

    // Add each governorate as an option in the dropdown list
    governorates.forEach(governorate => {
        const option = document.createElement("option");
        option.text = governorate;
        selectElement.add(option);
    });
}
window.addEventListener("DOMContentLoaded", () => {
    populateGovernorates(); // Populate governorates dropdown list

    const addDestinationButton = document.getElementById('add-destination');

    // ... (other code remains the same)

    // ... (other code remains the same)

    addDestinationButton.addEventListener('click', () => {
        // Clone the select element for governorates
        const selectElement = document.getElementById("governorates-list");
        const newSelectElement = selectElement.cloneNode(true);

        // Set the selectedIndex of the cloned select element to display the first option
        newSelectElement.selectedIndex = 0;

        // Create a new div to contain the select and remove button
        const newDestinationDiv = document.createElement('div');
        newDestinationDiv.classList.add('select');
        newDestinationDiv.appendChild(newSelectElement);
        newDestinationDiv.style.padding = '0.5rem';
        const removeButton = document.createElement('button');
        removeButton.innerText = '-';
        removeButton.type = 'button';
        removeButton.style.marginLeft = '0.5rem';
        removeButton.style.fontSize = '1.5rem';
        removeButton.style.border = 'none';
        removeButton.style.backgroundColor = 'transparent';
        removeButton.addEventListener("mouseenter", function () {
            removeButton.style.backgroundColor = "#eb736354"; // Change background color on hover
        });
        removeButton.addEventListener("mouseleave", function () {
            removeButton.style.backgroundColor = "transparent"; // Restore original background color on mouse leave
        });

        removeButton.addEventListener('click', () => {
            newDestinationDiv.remove();
        });
        newDestinationDiv.appendChild(removeButton);

        // Get the first destination div
        const firstDestinationDiv = document.querySelector('.destination');

        // Insert the new destination div as the last child of the first destination div
        firstDestinationDiv.appendChild(newDestinationDiv);
    });


    // ... (other code remains the same)

    // ... (other code remains the same)

    const travelForm = document.getElementById('travel-form');

    travelForm.addEventListener('submit', (event) => {
        // Prevent default form submission behavior
        event.preventDefault();

        // Get all destination inputs
        const destinations = document.querySelectorAll('.destination select');

        // Get other form data
        const numPeople = document.getElementById('num-people').value;
        const checkIn = document.getElementById('check-in').value;
        const checkOut = document.getElementById('check-out').value;
        const budget = document.getElementById('budget').value;

        // Function to calculate estimated budget based on daily rate and trip duration
        function calculateBudget(dailyRate, numPeople, checkIn, checkOut) {
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            const days = Math.floor((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

            // Assuming a base cost per person (adjust as needed)
            const baseCostPerPerson = 50;
            // Calculate total estimated budget
            const estimatedBudget = (dailyRate + baseCostPerPerson) * numPeople * days;

            return estimatedBudget;
        }

        // Function to display budget options based on user input
        function displayBudgetOptions(estimatedBudget) {
            // Define budget tiers (adjust ranges and labels as needed)
            const budgetTiers = [
                { label: "Budget-Friendly (Up to $1000)", max: 1000 },
                { label: "Moderate ($1000 - $2000)", min: 1000, max: 2000 },
                { label: "Comfortable ($2000 - $3000)", min: 2000, max: 3000 },
                { label: "Luxury ($3000+)" }
            ];

            // Validate data (optional, add checks for empty fields or invalid dates)

            // Display or submit the data (e.g., display a summary or submit to a server)
            const summary = `Travel Details:\n`;
            summary += `Destinations: ${[...destinations].map(select => select.value).join(', ')}\n`;
            summary += `Number of People: ${numPeople}\n`;
            summary += `Check-In Date: ${checkIn}\n`;
            summary += `Check-Out Date: ${checkOut}\n`;
            summary += `Available Budget: ${budget}`;

            console.log(summary); // For demonstration purposes, you can replace this with an alert or send the data to a server

            // Clear the form after successful submission (optional)
            travelForm.reset();
        }
        displayBudgetOptions();
    });
});
document.querySelector('.card-number-input').oninput = () => {
    document.querySelector('.card-number-box').innerText = document.querySelector('.card-number-input').value;
}

document.querySelector('.card-holder-input').oninput = () => {
    document.querySelector('.card-holder-name').innerText = document.querySelector('.card-holder-input').value;
}

document.querySelector('.month-input').oninput = () => {
    document.querySelector('.exp-month').innerText = document.querySelector('.month-input').value;
}

document.querySelector('.year-input').oninput = () => {
    document.querySelector('.exp-year').innerText = document.querySelector('.year-input').value;
}

document.querySelector('.cvv-input').onmouseenter = () => {
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
}

document.querySelector('.cvv-input').onmouseleave = () => {
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
}

document.querySelector('.cvv-input').oninput = () => {
    document.querySelector('.cvv-box').innerText = document.querySelector('.cvv-input').value;
}