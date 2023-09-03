// Function to fetch and display the image of the day for the selected date
function getImageOfTheDay(selectedDate) {
    const apiKey = "LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a&date=2023-03-30"; // Replace with your actual NASA API key

    // Construct the API URL
    const apiUrl = `https://api.nasa.gov/planetary/apod?date=${selectedDate}&api_key=${apiKey}`;

    // Fetch data from NASA's API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Display the image and other relevant information in #current-image-container
            const currentImageContainer = document.getElementById('current-image-container');
            currentImageContainer.innerHTML = `
                <img src="${data.url}" alt="${data.title}">
                <h2>${data.title}</h2>
                <p>${data.explanation}</p>
            `;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

// Function to save a date to local storage
function saveSearch(selectedDate) {
    // Retrieve the existing search history from local storage or initialize an empty array
    let searches = JSON.parse(localStorage.getItem('searches')) || [];

    // Add the selected date to the search history
    searches.push(selectedDate);

    // Save the updated search history back to local storage
    localStorage.setItem('searches', JSON.stringify(searches));
}

// Function to add a date to the search history
function addSearchToHistory(selectedDate) {
    // Create a list item element for the search history
    const listItem = document.createElement('li');
    listItem.textContent = selectedDate;

    // Add an event listener to the list item to fetch and display data when clicked
    listItem.addEventListener('click', function () {
        getImageOfTheDay(selectedDate);
    });

    // Append the list item to the search history list
    const searchHistoryList = document.getElementById('search-history');
    searchHistoryList.appendChild(listItem);
}

// Event listener for the form submission
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedDate = document.getElementById('search-input').value;
    getImageOfTheDay(selectedDate);
    saveSearch(selectedDate);
    addSearchToHistory(selectedDate);
});

// Initialize the page by displaying the image of the day for the current date
const currentDate = new Date().toISOString().split("T")[0];
getImageOfTheDay(currentDate);
// Add any other initialization code here