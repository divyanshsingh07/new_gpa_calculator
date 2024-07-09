// Function to update active link based on current page
function updateActiveLink() {
    // Get the current page filename (excluding path)
    const currentPage = location.pathname.split('/').pop();

    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a');

    // Loop through each navigation link
    navLinks.forEach(link => {
        // Get the link's href attribute (page filename)
        const linkPage = link.getAttribute('href').split('/').pop();

        // Compare the link's page filename with the current page filename
        if (linkPage === currentPage) {
            // Add 'active' class to the link if it matches the current page
            link.classList.add('active');
        } else {
            // Remove 'active' class from the link if it doesn't match
            link.classList.remove('active');
        }
    });
}

// Call the function to update active link when the page loads
updateActiveLink();