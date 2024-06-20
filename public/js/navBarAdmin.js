document.addEventListener("DOMContentLoaded", function() {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll(".navigation ul li");

    navLinks.forEach(function(link) {
        const linkHref = link.querySelector("a").getAttribute("href");

        if (currentLocation === linkHref) {
            link.style.backgroundColor = "white"; // Set background color to white
            link.querySelector("a").style.color = "var(--blue)"; // Set anchor text color to blue
        }
    });
});
