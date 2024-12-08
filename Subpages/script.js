// Adding functionality for the "Reach Out for Help" button
document.getElementById('reachOutBtn').addEventListener('click', () => {
    // Open a new page with helpful suicide prevention resources (this could be a page with more details)
    window.open('https://www.suicidepreventionlifeline.org/', '_blank');
});








// help section: 
// Function to fetch helpline from Google Custom Search API based on the country entered
async function fetchHelpline(country) {
    const apiKey = 'AIzaSyBqd2TjONV-fSOqqCBmKUwWFBstw5W1J4Y';  // Replace with your Google API key
    const cx = '7025364494c2e4285';  // Your Custom Search Engine ID

    // Construct the search query to look for suicide prevention helplines for the entered country
    const query = `suicide prevention helpline ${country}`;

    // API request URL to fetch search results
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${cx}&key=${apiKey}`;

    try {
        // Fetch the search results from the Google Custom Search API
        const response = await fetch(url);
        const data = await response.json();

        // Check if there are results
        if (data.items && data.items.length > 0) {
            // Get the first result link (optional: you can display all results)
            const firstResult = data.items[0].link;

            // Construct the search URL for your CSE with the same query
            const cseSearchUrl = `https://www.google.com/cse?cx=${cx}&q=${encodeURIComponent(query)}`;

            // Open your Custom Search Engine with the query pre-filled
            window.open(cseSearchUrl, "_blank");  // Open the search page in a new tab
        } else {
            // If no results found from the API, alert the user
            console.error("No results found for the helpline in your country.");
            alert("No helplines found for the entered country.");
        }
    } catch (error) {
        // Log and alert if there's an error during the API request
        console.error("Error fetching data from Google Custom Search API:", error);
        alert("An error occurred while searching. Please try again.");
    }
}

// Event listener for the button
document.getElementById('searchBtn').addEventListener('click', () => {
    // Ask the user to enter their country name
    const country = prompt("Enter your country name to find the helpline:");

    if (country) {
        // Call the function to fetch the helpline based on the entered country
        fetchHelpline(country);
    }
});
   











// Your YouTube API Key
// Your YouTube API Key
const apiKey = 'AIzaSyDQWFJ2oNmmO-9BXhv1wgEFCbJfXEq8ntQ';

// Function to fetch motivational songs from YouTube based on a search query
async function fetchMotivationalSongs(query) {
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&videoCategoryId=10&key=${apiKey}`;

    try {
        const response = await fetch(youtubeUrl);
        const data = await response.json();

        // Check if data has items
        if (data.items && data.items.length > 0) {
            const videos = data.items.map(item => ({
                title: item.snippet.title,
                videoId: item.id.videoId,
                thumbnail: item.snippet.thumbnails.high.url,
                description: item.snippet.description
            }));

            // Display the videos
            displayVideos(videos);
        } else {
            console.log('No motivational videos found.');
            alert("No motivational videos found.");
        }
    } catch (error) {
        console.error('Error fetching data from YouTube:', error);
        alert("An error occurred while fetching videos.");
    }
}

// Function to display the videos on the page
function displayVideos(videos) {
    const videosContainer = document.getElementById('videosContainer');
    videosContainer.innerHTML = '';  // Clear any previous videos

    // Ensure we have 8 videos to display (if fewer, add empty spaces)
    while (videos.length < 8) {
        videos.push({
            title: '',
            videoId: '',
            thumbnail: '',
            description: '',
            empty: true // Flag to mark empty videos
        });
    }

    // Loop through the videos and create HTML elements for each video
    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video');
        if (video.empty) {
            videoElement.classList.add('empty'); // Add 'empty' class for empty spaces
        }

        // Create thumbnail image
        if (!video.empty) {
            const thumbnail = document.createElement('img');
            thumbnail.src = video.thumbnail;
            thumbnail.alt = video.title;

            // Create a link to the YouTube video
            const videoLink = document.createElement('a');
            videoLink.href = `https://www.youtube.com/watch?v=${video.videoId}`;
            videoLink.target = '_blank';
            videoLink.textContent = video.title;

            // Create a description element
            const description = document.createElement('p');
            description.textContent = video.description;

            // Append the thumbnail, title, and description to the video element
            videoElement.appendChild(thumbnail);
            videoElement.appendChild(videoLink);
            videoElement.appendChild(description);
        }

        // Append the video element to the videos container
        videosContainer.appendChild(videoElement);
    });
}

// Function to determine the mood and fetch corresponding videos
function getVideosByMood() {
    let query = "";

    // Check which mood the user has selected
    const selectedMoods = [];
    if (document.getElementById("happyMood").checked) selectedMoods.push("happy");
    if (document.getElementById("silenceMood").checked) selectedMoods.push("silence");
    if (document.getElementById("inspiredMood").checked) selectedMoods.push("inspired");
    if (document.getElementById("devotionalMood").checked) selectedMoods.push("devotional");
    if (document.getElementById("peacefulMood").checked) selectedMoods.push("peaceful");

    // Construct query based on selected moods
    if (selectedMoods.length > 0) {
        query = selectedMoods.map(mood => `${mood} motivational music`).join(" OR ");
        fetchMotivationalSongs(query); // Fetch videos based on the constructed query
    } else {
        alert("Please select at least one mood.");
    }
}

// Optionally, you can trigger default motivational videos
fetchMotivationalSongs("motivational music");
