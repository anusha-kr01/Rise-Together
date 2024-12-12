// Your Custom Search Engine ID and API Key
const cx = '';  // Custom Search Engine ID cx=544406d1dbf464978
const apiKey = '';  // API Key

// Function to trigger search for donation websites based on category
function searchDonateWebsites(query) {
  // Construct the URL for your Custom Search Engine API request
  const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${cx}&key=${apiKey}`;
  
  // Fetch the search results using the Custom Search Engine API
  fetch(searchUrl)
    .then(response => response.json())
    .then(data => {
      // Check if there are any search results
      if (data.items && data.items.length > 0) {
        // Get the first result's URL
        const firstResultUrl = data.items[0].link;

        // Construct the search engine result page URL using cx and query
        const searchResultsUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&cx=${cx}`;

        // Open the search results page from your custom search engine in a new tab
        window.open(searchResultsUrl, '_blank');
      } else {
        alert('No results found!');
      }
    })
    .catch(error => {
      console.error('Error fetching search results:', error);
      alert('An error occurred while fetching search results.');
    });
}

// Function to handle click on the "Donate Now" button
function handleDonateClick(category) {
  let query = '';
  
  // Determine the search query based on the category
  if (category === 'shelter-food') {
    query = 'donate for shelter and food';
  } else if (category === 'legal-assistance') {
    query = 'donate for legal assistance refugees';
  } else if (category === 'healthcare') {
    query = 'donate for healthcare refugees';
  } else if (category === 'education-jobs') {
    query = 'donate for education and jobs refugees';
  } else if (category === 'emergency-support') {
    query = 'donate for emergency support refugees';
  } else if (category === 'housing-reconstruction') {
    query = 'donate for housing and reconstruction refugees';
  } else if (category === 'child-protection') {
    query = 'donate for child protection refugees';
  } else if (category === 'clean-water') {
    query = 'donate for clean water refugees';
  }

  // Call the search function for the respective category
  searchDonateWebsites(query);
}

// Function to handle click on the "Learn More" link
function handleLearnMoreClick(category) {
  let query = '';
  
  // Determine the search query based on the category
  if (category === 'shelter') {
    query = 'shelter resources for refugees';
  } else if (category === 'food') {
    query = 'food distribution resources for refugees';
  } else if (category === 'legal-assistance') {
    query = 'legal assistance resources for refugees';
  } else if (category === 'healthcare') {
    query = 'healthcare resources for refugees';
  }

  // Call the search function for the respective category
  searchDonateWebsites(query);
}

// Event listeners for each donation category button
document.getElementById('shelter-food-btn').addEventListener('click', function() {
  handleDonateClick('shelter-food');
});

document.getElementById('legal-assistance-btn').addEventListener('click', function() {
  handleDonateClick('legal-assistance');
});

document.getElementById('healthcare-btn').addEventListener('click', function() {
  handleDonateClick('healthcare');
});

document.getElementById('education-jobs-btn').addEventListener('click', function() {
  handleDonateClick('education-jobs');
});

document.getElementById('emergency-support-btn').addEventListener('click', function() {
  handleDonateClick('emergency-support');
});

// Event listeners for new donation categories
document.getElementById('housing-reconstruction-btn').addEventListener('click', function() {
  handleDonateClick('housing-reconstruction');
});

document.getElementById('child-protection-btn').addEventListener('click', function() {
  handleDonateClick('child-protection');
});

document.getElementById('clean-water-btn').addEventListener('click', function() {
  handleDonateClick('clean-water');
});

// Event listeners for "Learn More" links in Resources section
document.querySelectorAll('.learn-more').forEach((link) => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    const resourceCategory = this.getAttribute('data-category');
    handleLearnMoreClick(resourceCategory);
  });
});












// Function to fetch and display refugee-related news with images
async function fetchRefugeeNews() {
  const apiKey = ''; // Your NewsAPI key
  // Using a more refined query to fetch refugee-related news
  const apiUrl = `https://newsapi.org/v2/everything?q=refugee OR asylum OR displacement&language=en&apiKey=${apiKey}`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 'ok' && data.articles.length > 0) {
          // Get the news container element
          const newsContainer = document.getElementById('newsContainer');
          newsContainer.innerHTML = ''; // Clear previous news if any

          // Limit the number of news to 8 (2 rows, 4 boxes per row)
          const articlesToDisplay = data.articles.slice(0, 8);

          // Loop through the news articles and create news boxes
          articlesToDisplay.forEach(article => {
              const newsBox = document.createElement('div');
              newsBox.classList.add('news-box');

              // Create and append the image if available
              if (article.urlToImage) {
                  const newsImage = document.createElement('img');
                  newsImage.src = article.urlToImage;
                  newsImage.alt = article.title;
                  newsImage.classList.add('news-image');
                  newsBox.appendChild(newsImage);
              }

              // Create and append article title
              const newsTitle = document.createElement('h3');
              newsTitle.innerText = article.title;
              newsBox.appendChild(newsTitle);

              // Create and append article description
              const newsDescription = document.createElement('p');
              newsDescription.innerText = article.description || 'No description available.';
              newsBox.appendChild(newsDescription);

              // Create and append "Read More" link
              const newsLink = document.createElement('a');
              newsLink.href = article.url;
              newsLink.target = "_blank"; // Open in a new tab
              newsLink.innerText = 'Read More';
              newsBox.appendChild(newsLink);

              // Append the news box to the container
              newsContainer.appendChild(newsBox);
          });
      } else {
          document.getElementById('newsContainer').innerHTML = 'No refugee-related news available at the moment.';
      }
  } catch (error) {
      console.error('Error fetching news:', error);
      document.getElementById('newsContainer').innerHTML = 'Failed to load news. Please try again later.';
  }
}

// Fetch the news when the page loads
window.onload = fetchRefugeeNews;
