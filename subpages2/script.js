document.addEventListener("DOMContentLoaded", function () {
    // Survival Strategies data for disaster preparedness
    const survivalStrategiesData = {
        earthquakes: {
            title: "Earthquake Survival Strategy",
            description: `
                <ol>
                    <li>Secure heavy items like shelves, mirrors, and electronics.</li>
                    <li>Identify safe spots under sturdy furniture or against interior walls.</li>
                    <li>Prepare an emergency kit with essential supplies.</li>
                    <li>Stay away from windows, glass, and exterior walls during a quake.</li>
                    <li>Practice "Drop, Cover, and Hold On" drills regularly.</li>
                </ol>`,
            image: "images/earthquake.jpg"  // Replace with actual image path
        },
        floods: {
            title: "Flood Survival Strategy",
            description: `
                <ol>
                    <li>Know your area's flood risk and evacuation routes.</li>
                    <li>Keep important documents in waterproof containers.</li>
                    <li>Avoid walking or driving through floodwaters.</li>
                    <li>Elevate electrical appliances and install sump pumps.</li>
                    <li>Have a communication plan with your family.</li>
                </ol>`,
            image: "images/flood.jpg"  // Replace with actual image path
        },
        tsunamis: {
            title: "Tsunami Survival Strategy",
            description: `
                <ol>
                    <li>Know the natural warning signs, such as sudden sea level changes.</li>
                    <li>Move immediately to higher ground when a warning is issued.</li>
                    <li>Avoid the beach and coastal areas during a tsunami alert.</li>
                    <li>Stay informed through radio or local emergency alerts.</li>
                    <li>Have a family evacuation and communication plan.</li>
                </ol>`,
            image: "images/tsunami.jpg"  // Replace with actual image path
        },
        wildfires: {
            title: "Wildfire Survival Strategy",
            description: `
                <ol>
                    <li>Create a defensible space by clearing flammable materials near your home.</li>
                    <li>Have an emergency evacuation plan and practice it regularly.</li>
                    <li>Stay tuned to local alerts and evacuate promptly if directed.</li>
                    <li>Use fire-resistant building materials for your home.</li>
                    <li>Keep emergency supplies, including N95 masks, ready.</li>
                </ol>`,
            image: "images/wildfire.jpg"  // Replace with actual image path
        },
        landslides: {
            title: "Landslide Survival Strategy",
            description: `
                <ol>
                    <li>Monitor signs of land movement, such as cracks in the ground.</li>
                    <li>Avoid building or living near steep slopes or areas prone to landslides.</li>
                    <li>Have an evacuation plan and know your area's hazard maps.</li>
                    <li>Ensure proper drainage to reduce soil saturation near your home.</li>
                    <li>Stay informed about weather conditions, especially during heavy rains.</li>
                </ol>`,
            image: "images/landslide.jpg"  // Replace with actual image path
        },
        droughts: {
            title: "Drought Survival Strategy",
            description: `
                <ol>
                    <li>Conserve water by fixing leaks and using water-saving appliances.</li>
                    <li>Store emergency water supplies for drinking and sanitation.</li>
                    <li>Practice xeriscaping (landscaping with drought-tolerant plants).</li>
                    <li>Be aware of water restrictions in your area.</li>
                    <li>Plan for reduced agricultural yields if you rely on farming.</li>
                </ol>`,
            image: "images/drought.jpg"  // Replace with actual image path
        }
    };

    // Generate the survival strategy boxes
    const survivalStrategyContainer = document.getElementById('survival-strategy-container');
    Object.keys(survivalStrategiesData).forEach(key => {
        const strategy = survivalStrategiesData[key];
        const strategyBox = document.createElement('div');
        strategyBox.classList.add('strategy-box');
        strategyBox.innerHTML = `
            <h3>${strategy.title}</h3>
            <img src="${strategy.image}" alt="${strategy.title}">
            <p><a href="#" class="view-strategy" data-type="${key}">View Strategy</a></p>
        `;
        survivalStrategyContainer.appendChild(strategyBox);
    });

    // Show detailed strategy when clicked in the Survival Strategies section
    document.querySelectorAll('.view-strategy').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent navigation
            const type = this.getAttribute('data-type'); // Get disaster type
            const content = survivalStrategiesData[type]; // Fetch content

            if (content) {
                const modal = document.createElement('div');
                modal.classList.add('modal');
                modal.innerHTML = `
                    <div class="modal-content">
                        <h3>${content.title}</h3>
                        <p>${content.description}</p>
                        <span class="close">&times;</span>
                    </div>
                `;
                document.body.appendChild(modal);

                modal.style.display = "flex"; // Show modal

                // Close modal when "X" is clicked
                modal.querySelector('.close').addEventListener('click', function () {
                    modal.style.display = "none";
                });

                // Close modal when clicking outside the content
                window.addEventListener('click', function (event) {
                    if (event.target === modal) {
                        modal.style.display = "none";
                    }
                });
            }
        });
    });
});













// donation part:
// Function to fetch crisis data from ReliefWeb and display it in the donation section
async function fetchDonationCrisisData() {
    try {
        const response = await fetch('https://api.reliefweb.int/v1/reports?query[value]=disaster&limit=4');
        const crisisData = await response.json();
        const donationContainer = document.getElementById('donation-container');
        donationContainer.innerHTML = ''; // Clear existing donation boxes

        // Loop through each crisis and create a donation box
        for (let crisis of crisisData.data) {
            const donationBox = document.createElement('div');
            donationBox.classList.add('donation-box');

            // Fetch an image based on the crisis title (or keywords)
            const imageUrl = await fetchImage(crisis.fields.title.toLowerCase());

            // Donation Box Content
            const image = document.createElement('img');
            image.src = imageUrl;
            image.alt = crisis.fields.title;
            image.classList.add('donation-image');

            const header = document.createElement('div');
            header.classList.add('donation-header');
            header.innerHTML = `<h3>${crisis.fields.title} <span>Donate Now</span></h3>`;

            const content = document.createElement('div');
            content.classList.add('donation-content');

            const description = document.createElement('p');
            description.textContent = `Help those affected by this disaster. Your contribution will provide essential relief.`;
            description.classList.add('donation-description'); // Add a specific class for styling

            // Create the "Donate Now" button with updated functionality
            const donateButton = document.createElement('button');
            donateButton.classList.add('donate-btn');
            donateButton.textContent = 'Donate Now';
            donateButton.onclick = () => {
                // Open the Google Custom Search Engine page with the query related to donation
                const searchQuery = encodeURIComponent(crisis.fields.title + " donate");
                const searchUrl = `https://cse.google.com/cse?cx=a6329fc247e6a4083&q=${searchQuery}`;
                window.open(searchUrl, '_blank');  // Opens the search engine in a new tab
            };

            content.appendChild(description);
            content.appendChild(donateButton);

            // Append everything to the donationBox
            donationBox.appendChild(header);
            donationBox.appendChild(image);
            donationBox.appendChild(content);

            // Append the donation box to the container
            donationContainer.appendChild(donationBox);
        }
    } catch (error) {
        console.error('Error fetching donation crisis data:', error);
    }
}

// Call the function to fetch crisis data when the page loads
fetchDonationCrisisData();









// home part: 
// Function to fetch image from Google Custom Search API based on a query (e.g., crisis title)
async function fetchImage(query) {
    const apiKey = '';  // Replace with your Google API key
    const cx = '';  // Your Custom Search Engine ID
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&searchType=image&cx=${cx}&key=${apiKey}`;

    // Predefined local images as fallback
    const localImages = {
        earthquake: 'images/earthquake.jpg',  // Replace with the path to your image file
        flood: 'images/flood.jpg',
        wildfire: 'images/wildfire.jpg',
        hurricane: 'images/tsunami.jpg',
        default: 'dis.jpg', // Fallback if no specific image is matched
    };

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Check if images are available in the response
        if (data.items && data.items.length > 0) {
            const imageUrl = data.items[0].link;  // Get the first image URL
            console.log("Image URL:", imageUrl);  // Log the image URL for debugging
            return imageUrl;
        } else {
            console.error("No image found for query:", query);  // Log error if no image is found
            // Match query with local images
            const matchedImage = Object.keys(localImages).find(key => query.includes(key)) || 'default';
            return localImages[matchedImage];
        }
    } catch (error) {
        console.error("Error fetching image from Google Custom Search:", error);
        // Match query with local images in case of error
        const matchedImage = Object.keys(localImages).find(key => query.includes(key)) || 'default';
        return localImages[matchedImage];
    }
}





// Function to fetch crisis data from ReliefWeb and display it
async function fetchCrisisData() {
    try {
        const response = await fetch('https://api.reliefweb.int/v1/reports?query[value]=disaster&limit=4');
        const crisisData = await response.json();
        const crisisBoxesContainer = document.getElementById('crisis-boxes-container');
        crisisBoxesContainer.innerHTML = '';  // Clear existing boxes

        for (let crisis of crisisData.data) {
            const crisisBox = document.createElement('div');
            crisisBox.classList.add('crisis-box');
            
            // Fetch an image based on the crisis title (or keywords) using the updated fetchImage function
            const imageUrl = await fetchImage(crisis.fields.title.toLowerCase());

            const image = document.createElement('img');
            image.src = imageUrl;  // Set the image source
            image.alt = crisis.fields.title;
            image.classList.add('crisis-image');
            
            // Add event listener to check if the image is loaded correctly
            image.onload = () => {
                console.log("Image loaded successfully:", imageUrl);
            };
            image.onerror = () => {
                console.error("Failed to load image:", imageUrl);
                image.src = 'https://via.placeholder.com/342x242';  // Fallback placeholder image
            };
            
            const title = document.createElement('h3');
            title.classList.add('crisis-title');
            title.textContent = crisis.fields.title;
            
            const date = document.createElement('p');
            date.classList.add('crisis-date');
            date.textContent = `Start Date: ${crisis.fields.date || 'N/A'}`;
            
            // Remove the Donate button and just keep the Read More button
            const readMoreButton = document.createElement('button');
            readMoreButton.classList.add('read-more-button');
            readMoreButton.textContent = 'Read More';
            readMoreButton.onclick = () => {
                // Construct the search query URL using the Programmable Search Engine
                const query = encodeURIComponent(crisis.fields.title); // Encode the title for the URL
                const searchEngineUrl = `https://cse.google.com/cse?cx=a6329fc247e6a4083&q=${query}`;
                
                // Open the search engine URL in a new tab
                window.open(searchEngineUrl, '_blank');
            };

            // Append everything to the crisisBox
            crisisBox.appendChild(image);
            crisisBox.appendChild(title);
            // crisisBox.appendChild(date);
            crisisBox.appendChild(readMoreButton);  // Only append the Read More button
            
            // Append the crisisBox to the container
            crisisBoxesContainer.appendChild(crisisBox);
        }
    } catch (error) {
        console.error('Error fetching crisis data:', error);
    }
}

// Call the function to fetch data when the page loads
fetchCrisisData();






// profile login 
document.addEventListener("DOMContentLoaded", function () {
    const profileLink = document.querySelector('a[href="#profile-section"]');
    const loginSection = document.getElementById('login-section');
    const profileSection = document.getElementById('profile-section');
    const loginForm = document.getElementById('login-form');
    const profileDetailsContainer = document.getElementById('profile-details');

    // Check if user data exists in localStorage
    let user = JSON.parse(localStorage.getItem('user')) || null;

    // Initialize view based on login state
    if (user) {
        showProfileSection();
        populateProfileDetails();
    } else {
        showLoginSection();
    }

    profileLink.addEventListener('click', (event) => {
        event.preventDefault();

        if (user) {
            showProfileSection();
            profileSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            showLoginSection();
            loginSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Handle login form submission
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Simulate saving user data (Replace this with API calls in a real application)
        const formData = new FormData(loginForm);
        user = {
            name: formData.get('name'),
            email: formData.get('email'),
            joinedOn: new Date().toLocaleDateString(),
            posts: 0,
            donations: 0
        };

        // Save user data in localStorage
        localStorage.setItem('user', JSON.stringify(user));

        // Show profile section and populate details
        showProfileSection();
        populateProfileDetails();
        profileSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Populate profile details dynamically
    function populateProfileDetails() {
        if (user) {
            profileDetailsContainer.innerHTML = `
                <h2>${user.name}</h2>
                <p><strong>Joined on:</strong> ${user.joinedOn}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                    `;
        }
    }

    // Show login section
    function showLoginSection() {
        loginSection.style.display = 'block';
        profileSection.style.display = 'none';
    }

    // Show profile section
    function showProfileSection() {
        loginSection.style.display = 'none';
        profileSection.style.display = 'block';
    }
});

