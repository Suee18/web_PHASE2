const urlParams = new URLSearchParams(window.location.search);
const packageNumber = urlParams.get('package');

// Display the package number wherever you need it on details.html
console.log("Selected Package Number:", packageNumber);

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

    var governoratesList = $('#governorates-list');
    governorates.forEach(function(governorate) {
        governoratesList.append($('<option>', {
            value: governorate,
            text: governorate
        }));
    });

    if (packageNumber === '1') {
        // Disable "Add Destination" button and style its background
        $('#add-destination').prop('disabled', true).css({
            'background-color': 'lightgray',
            'color': 'gray' // Example: Change text color to white
        });

        // Disable .hotel section and style its background
        $('.hotel').css({
            'pointer-events': 'none',
            'background-color': 'lightgray',
            'color': 'gray' // Example: Change text color to white
        });

        // Disable input fields inside .hotel section
        $('.hotel input, .hotel select').prop('disabled', true).css({
            'background-color': 'lightgray',
            'color': 'gray' // Example: Change text color to white
        });
    }

    if (packageNumber === '2') {
        $('.hotel').css({
            'pointer-events': 'none',
            'background-color': 'lightgray',
            'color': 'gray' // Example: Change text color to white
        });

        // Disable input fields inside .hotel section
        $('.hotel input, .hotel select').prop('disabled', true).css({
            'background-color': 'lightgray',
            'color': 'gray' // Example: Change text color to white
        });
    }

    $(".next").click(function (event) {
        event.preventDefault();
        if (!validateFields()) {
            return;
        }
        var current_fs = $(this).parent();
        var next_fs = $(this).parent().next();

        // Proceed to the next step
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        next_fs.show();
        current_fs.animate({ opacity: 0 }, {
            step: function (now) {
                opacity = 1 - now;
                current_fs.css({ 'display': 'none', 'position': 'relative' });
                next_fs.css({ 'opacity': opacity });
            },
            duration: 600
        });
        setProgressBar($("fieldset").index(next_fs) + 1);
        redirectToNextPage(packageNumber);
    });

    $(".prev").click(function (event) {
        event.preventDefault();
        window.location.href = `packages?package=${packageNumber}`;
    });
});
function validateFields() {
    var isValid = true;
    $("fieldset:visible").find("input[required], select[required]").each(function() {
        var isDisabled = $(this).is(':disabled') || $(this).css('pointer-events') === 'none';
        if (!isDisabled && ($(this).val() === "" || $(this).val() === "Select A Destination" || $(this).val() === "0")) {
            if (!window.packageAlertShown) {
                alert("Please fill out all required fields.");
                window.packageAlertShown = true;
            }
            
            isValid = false;
            $(this).css("border-color", "red");
        } else {
            $(this).css("border-color", "");
        }
    });
    var checkInDate = $('#check-in').val();
    var checkOutDate = $('#check-out').val();
    if (!isDateFromTodayOrLater(checkInDate)) {
        isValid = false;
        alert("Check in date must be from today or later");
        $('#check-in').css("border-color", "red");
    } else {
        $('#check-in').css("border-color", "");
    }

    if (!isDateAfter(checkOutDate, checkInDate)) {
        isValid = false;
        alert("Check out date must be after check in date.");
        $('#check-out').css("border-color", "red");
    } else {
        $('#check-out').css("border-color", "");
    }
    return isValid;
}
function setProgressBar(curStep) {
    var percent = parseFloat(100 / $("fieldset").length) * curStep;
    percent = percent.toFixed();
    $(".progress-bar").css("width", percent + "%");
}
function isDateFromTodayOrLater(dateString) {
    var today = new Date();
    var selectedDate = new Date(dateString);
    return selectedDate >= today;
}

function isDateAfter(dateString1, dateString2) {
    var date1 = new Date(dateString1);
    var date2 = new Date(dateString2);
    return date1 > date2;
}


function redirectToNextPage(packageNumber) {
    var destination = $('#governorates-list').val();
        var numPeople = $('#num-people').val();
        var checkIn = $('#check-in').val();
        var checkOut = $('#check-out').val();
        var budget = $('#budget').val();
        var numAdults = $('#num-adults').val();
        var numChildren = $('#num-children').val();
        var numRooms = $('#num-room').val();
        var hotelPackage = $('#h-package').val();

        if ($('#governorates-list').is(':disabled')) destination = null;
        if ($('#num-people').is(':disabled')) numPeople = null;
        if ($('#check-in').is(':disabled')) checkIn = null;
        if ($('#check-out').is(':disabled')) checkOut = null;
        if ($('#budget').is(':disabled')) budget = null;
        if ($('#num-adults').is(':disabled')) numAdults = null;
        if ($('#num-children').is(':disabled')) numChildren = null;
        if ($('#num-room').is(':disabled')) numRooms = null;
        if ($('#h-package').is(':disabled')) hotelPackage = null;

        window.location.href = `intrests_rate?$package=${packageNumber}&destination=${destination}&numPeople=${numPeople}&checkIn=${checkIn}&checkOut=${checkOut}&budget=${budget}&numAdults=${numAdults}&numChildren=${numChildren}&numRooms=${numRooms}&hotelPackage=${hotelPackage}`;
}
