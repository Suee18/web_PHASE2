function selectPackage(packageId) {
    // Reset all package buttons to unselected
    $('.package button').attr('data-selected', 'false');
    $('.package').removeClass('selected');
    // Set the selected package button to selected
    $(`#package${packageId} button`).attr('data-selected', 'true');
    $(`#package${packageId}`).addClass('selected');
    // Optional: Scroll to the next step automatically
    scrollToNextStep();
}
$(document).ready(function () {
    // Your jQuery-dependent code here
    $(".next").click(function (event) {
        event.preventDefault();
        var current_fs = $(this).parent();
        var next_fs = $(this).parent().next();

        // Validate package selection before proceeding
        if (!validatePackageSelection()) {
            return;
        }

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
        var selectedPackageNumber = getSelectedPackageNumber();
        if (selectedPackageNumber !== null) {
            redirectToNextPage(selectedPackageNumber);
        }
    });
    // Function to validate if a package is selected
    function validatePackageSelection() {
        var packageSelected = false;
        $('.package button').each(function () {
            if ($(this).attr('data-selected') === 'true') {
                packageSelected = true;
            }
        });

        // If no package is selected, show an alert and return false
        if (!packageSelected) {
            if (!window.packageAlertShown) {
                alert("Please select a package before proceeding.");
                window.packageAlertShown = true;
            }
            return false;
        }

        // If a package is selected, return true to allow form submission
        return true;
    }
    function getSelectedPackageNumber() {
        var selectedPackageNumber = null;
        $('.package button').each(function (index) {
            if ($(this).attr('data-selected') === 'true') {
                selectedPackageNumber = index + 1; // Package numbers are 1-based
                return false; // Exit each loop early
            }
        });
        return selectedPackageNumber;
    }
    function redirectToNextPage(packageNumber) {
        // Replace with your actual redirect logic
        // Example: Redirect to 'details.html' with packageNumber as a query parameter
        window.location.href = `plan_input?$package=${packageNumber}`;
    }
    // Event listener for Next button outside the jQuery click event
    document.getElementById('next-bt').addEventListener('click', function (event) {
        if (document.getElementById('msform').checkValidity()) {
            if (!validatePackageSelection()) {
                event.preventDefault(); // Prevent form submission if package is not selected
            }
        } else {
            event.preventDefault(); // Prevent form submission if form fields are not valid
        }
    });

    // Function to set progress bar based on current step
    function setProgressBar(curStep) {
        var percent = parseFloat(100 / $("fieldset").length) * curStep;
        percent = percent.toFixed();
        $(".progress-bar").css("width", percent + "%");
    }
});
