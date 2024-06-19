document.addEventListener('DOMContentLoaded', function() {
    const profileImage = document.querySelector('.profile');
    const panelImage = document.querySelector('.profileIconPanel');
    const slidingPanel = document.getElementById('slidingPanel');

    // Function to toggle the panel
    function togglePanel() {
        slidingPanel.classList.toggle('panel-open');
    }

    // Event listener for the profile image in the navbar
    profileImage.addEventListener('click', togglePanel);

    // Check if a panel image is available before adding event listener
    if (panelImage) {
        panelImage.addEventListener('click', togglePanel);
    }

    // Clicking outside the panel or on the panel image to close it
    document.addEventListener('click', function(event) {
        if (!slidingPanel.contains(event.target) && !profileImage.contains(event.target) && slidingPanel.classList.contains('panel-open')) {
            slidingPanel.classList.remove('panel-open');
        }
    }, true); // Use capture phase for broad coverage

    // Function to fetch the latest avatar
    function fetchAvatar() {
        fetch('/profile/avatar')
            .then(response => response.json())
            .then(data => {
                if (data.avatar) {
                    profileImage.src = data.avatar;
                    if (panelImage) {
                        panelImage.src = data.avatar;
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching avatar:', error);
            });
    }

    // Poll for the latest avatar every 5 seconds
    setInterval(fetchAvatar, 5000);

    // Load the navbar and initialize functionality
    function loadNavbar() {
        const navbarPath = '/js/navBarLoggedin.ejs'; // Path to the navbar HTML
        fetch(navbarPath)
            .then(response => response.text())
            .then(data => {
                const navbarContainer = document.getElementById('NavbarLoggedin_call');
                navbarContainer.innerHTML = data;
                initNavbar(); // Initialize navbar functionality after it is loaded
            })
            .catch(error => {
                console.error('Error fetching navbar:', error);
            });
    }

    // Initialize navbar functionality
    function initNavbar() {
        const profileImage = document.querySelector('.profile');
        const panelImage = document.querySelector('.profileIconPanel');
        const slidingPanel = document.getElementById('slidingPanel');

        if (profileImage) {
            profileImage.addEventListener('click', function() {
                slidingPanel.classList.toggle('panel-open');
            });
        }

        if (panelImage) {
            panelImage.addEventListener('click', function() {
                slidingPanel.classList.toggle('panel-open');
            });
        }

        document.addEventListener('click', function(event) {
            if (!slidingPanel.contains(event.target) && !profileImage.contains(event.target) && slidingPanel.classList.contains('panel-open')) {
                slidingPanel.classList.remove('panel-open');
            }
        }, true); // Using the capture phase to ensure the event is captured early
    }

    loadNavbar();
});
