const postsPerPage = 6;

let blogData = [];

// Set the API endpoint, allowing override via a global variable or environment variable
const BLOG_API_ENDPOINT = window.BLOG_API_ENDPOINT || 'http://localhost:8080/blog';

// Fetch blog data and initialize view
fetch(BLOG_API_ENDPOINT)
  .then(response => response.json())
  .then(data => {
    blogData = data;
    showCurrentPage();
    generatePagination();
  })
  .catch(error => console.error('Error fetching blog data:', error));

// Show the current page based on URL (used on load and popstate)
function showCurrentPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const page = parseInt(urlParams.get('page')) || 1;
  displayBlogPosts(page);
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
  let postsHTML = "";
  for (let i = startIndex; i < endIndex && i < blogData.length; i++) {
    const post = blogData[i];
    postsHTML += `
      <div class="post post-${i}">
        <h5>${escapeHtml(post.title)}</h5>
        <p>${escapeHtml(post.content)}</p>
      </div>
    `;
  }
  blogPostsContainer.innerHTML = postsHTML;
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
      history.pushState(null, null, `blog.html?page=${i}`);
      showCurrentPage();
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

  // Regenerate pagination to keep it up-to-date
  generatePagination();
}

// Simple HTML escape helper to avoid injecting raw HTML from data
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"']/g, function(m) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m];
  });
}