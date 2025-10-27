const postsPerPage = 6;
const urlParams = new URLSearchParams(window.location.search);
const initialPage = parseInt(urlParams.get('page')) || 1;

fetch('http://localhost:8080/blog')
  .then(response => response.json())
  .then(data => {
    blogData = data;
    showCurrentPage();
    generatePagination();
  })
  .catch(error => console.error('Error fetching blog data:', error));

let blogData = [

];

function showCurrentPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const page = parseInt(urlParams.get('page')) || 1;
  generateBlogPosts(page);
}

// Listen for browser navigation (back/forward)
window.addEventListener('popstate', showCurrentPage);

// Function to generate blog posts
function generateBlogPosts(pageNumber) {
  const blogPostsContainer = document.getElementById("blog-posts");
  // Clear existing content
  blogPostsContainer.innerHTML = "";

  // Calculate the start and end index for the current page
  const startIndex = (pageNumber - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  // Loop through the blogData and create HTML for each post within the current page
  for (let i = startIndex; i < endIndex && i < blogData.length; i++) {
    const post = blogData[i];
    const postHTML = `
      <div class="post post-${i}">
        <h5>${post.title}</h5>
        <p>${post.content}</p>
      </div>
    `;
    // Append postHTML to blogPostsContainer
    blogPostsContainer.innerHTML += postHTML;
  }
}

// Function to generate pagination
function generatePagination() {
  const paginationContainer = document.getElementById("pagination");

  // Clear existing content
  paginationContainer.innerHTML = "";

  // Calculate the total number of pages
  const totalPages = Math.ceil(blogData.length / postsPerPage);

  // Generate pagination links dynamically
  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = `blog.html?page=${i}`;
    pageLink.textContent = i;
    pageLink.addEventListener("click", function(e) { 
      e.preventDefault();
      displayBlogPosts(i); 
    });
    paginationContainer.appendChild(pageLink);
  }
}

// Function to display blog posts based on page number
function displayBlogPosts(pageNumber) {
  // Update the URL to reflect the current page
  history.pushState(null, null, `blog.html?page=${pageNumber}`);
  
  // Generate and display blog posts for the given page
  generateBlogPosts(pageNumber);
}