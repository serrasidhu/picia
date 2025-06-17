document.addEventListener('DOMContentLoaded', () => {
    const listingsContainer = document.getElementById('listings-container');
    const addListingForm = document.getElementById('add-listing-form');
    const searchBar = document.getElementById('search-bar'); // Added
    const searchButton = document.getElementById('search-button'); // Added

    // Sample listings data (in-memory store)
    let listings = [
        { title: 'Vintage Bicycle', description: 'A classic road bike, good condition.', price: 150 },
        { title: 'Old Bookshelf', description: 'Wooden bookshelf, 5 shelves.', price: 50 },
        { title: 'Gaming Console', description: 'Latest generation gaming console, barely used.', price: 400 }
    ];

    // Function to display listings
    function displayListings(items = listings) {
        listingsContainer.innerHTML = ''; // Clear existing listings
        if (items.length === 0) {
            listingsContainer.innerHTML = '<p>No items found matching your search.</p>'; // Modified message
            return;
        }
        items.forEach(item => {
            const listingDiv = document.createElement('div');
            listingDiv.className = 'listing';
            listingDiv.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <p><strong>Price: $${item.price}</strong></p>
            `;
            listingsContainer.appendChild(listingDiv);
        });
    }

    // Function to add a new listing
    function addListing(event) {
        event.preventDefault();

        const title = document.getElementById('listing-title').value;
        const description = document.getElementById('listing-description').value;
        const price = parseFloat(document.getElementById('listing-price').value);

        if (title && description && !isNaN(price)) {
            listings.unshift({ title, description, price }); // Add to the beginning for newest first
            displayListings();
            addListingForm.reset();
        } else {
            alert('Please fill in all fields correctly.');
        }
    }

    // Function to search listings (New)
    function searchListings() {
        const searchTerm = searchBar.value.toLowerCase();
        if (searchTerm.trim() === '') {
            displayListings(listings); // Display all if search is empty
            return;
        }
        const filteredListings = listings.filter(item =>
            item.title.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm)
        );
        displayListings(filteredListings);
    }

    // Event Listeners
    if (addListingForm) {
        addListingForm.addEventListener('submit', addListing);
    }

    if (searchButton) { // Added
        searchButton.addEventListener('click', searchListings);
    }

    if (searchBar) { // Added for Enter key press
        searchBar.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                searchListings();
            }
        });
    }

    // Initial display of listings
    displayListings();
});
