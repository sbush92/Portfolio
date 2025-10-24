const postsPerPage = 6;
const blogData = [
  {
    title: "The Genesis: Why Start a Blog?",
    content:
      "The decision to start this blog was born out of a desire to document my journey in the tech space. Over the years, I've been a silent observer, soaking up knowledge from the incredible tech community. Now, it's time to give back, to share my own learnings, challenges, and triumphs as I navigate the ever-evolving landscape of technology.",
  },
  {
    title: "A Trip Down Memory Lane: Rediscovering Web Development",
    content:
      "As I dust off the virtual pen and paper for this inaugural post, I'm reminded of the first lines of code I ever wrote. Today's adventure took me back to the basics, to the fundamentals that sparked my passion for web development. A quick shoutout to the Stack Overflow community for being my guiding light as I revisited npm scripts to launch a local server. (Check out the thread here if you're feeling a bit nostalgic or in need of a quick refresher!)",
  },
  {
    title: "Navigating Uncharted Waters",
    content:
      "Launching a blog feels like setting sail into uncharted waters. It's a blend of excitement and anticipation, wondering where this journey will take me and who I'll meet along the way. I'm ready to embrace the learning curve, share my discoveries, and connect with fellow enthusiasts who stumble upon these digital pages.",
  },
  {
    title: "What to Expect: A Chronicle of Tech Adventures",
    content:
      "In the coming posts, you can expect a mix of personal anecdotes, tech tutorials, and reflections on industry trends. Consider this blog a shared space where we can explore, learn, and grow together. From coding triumphs to the occasional debugging misadventure, I invite you to join me on this rollercoaster of tech exploration.",
  },
  {
    title: "Closing Thoughts: Here's to New Beginnings",
    content:
      "As I pen down these thoughts, I'm filled with a sense of anticipation and optimism. This is not just my first blog post—it's a declaration of a new chapter, a commitment to sharing, learning, and building connections in the vast landscape of the blogosphere. Here's to many more posts, discoveries, and shared moments on this exciting journey. Thank you for joining me, and I look forward to the adventures that lie ahead!",
  },
  {
    title: "Finished with Identifying Irises!",
    content:
      "Embarking on the journey of machine learning often begins with the classic 'Identify Irises' project. Thanks to the wonders of scikit-learn, my initial foray into this fascinating realm proved to be quite seamless. The task of sorting irises into distinct classes—Setosa, Versicolour, and Virginica—became a walk in the park with the powerful capabilities of scikit-learn. This project, often touted as a common first step in the world of machine learning, serves as an excellent introduction to the practical application of algorithms and model training. But as the saying goes, 'Once you master the basics, it's time to level up.'",
  },
  {
    title: "The Transition to Sales Forecasting",
    content:
      "The ease of identifying irises sparked my curiosity about more complex real-world applications of machine learning. Enter the realm of sales forecasting—a critical business practice that leverages historical data to estimate future sales. This shift from the botanical world to the retail landscape marks a natural progression in my machine learning journey. In the context of sales forecasting, the questions become more intricate. How can we predict future sales based on historical data? How do external factors like seasonal markdowns impact sales figures? Enter my latest endeavor: a machine learning project centered around predicting department-wide sales for 45 Walmart stores across diverse regions.",
  },
  {
    title: "Navigating the Sales Forecasting Landscape",
    content:
      "This project presents a unique challenge, dealing with a real-world sales dataset provided by Walmart. The objective is clear: predict department-wide sales while factoring in significant seasonal markdown periods—think Labor Day, Thanksgiving, and Christmas. The intricacies of this task require a more nuanced approach, pushing me to explore advanced machine learning techniques to ensure accurate and insightful predictions.",
  },
  {
    title: "Why Sales Forecasting Matters",
    content:
      "The relevance of sales forecasting cannot be overstated. Businesses rely on these predictions to make informed decisions, optimize inventory management, and adapt to changing market dynamics. As technology evolves, so do the tools at our disposal, with machine learning emerging as a powerful ally in enhancing the accuracy and efficiency of sales forecasts. So, buckle up for this new adventure! From identifying irises to navigating the intricate landscape of sales forecasting, each project contributes to my growth as a data enthusiast. I'm excited to delve into the complexities of this sales forecasting challenge, armed with the knowledge gained from simpler projects and the powerful capabilities of machine learning tools. Stay tuned for updates on the progress of this project, and as always, feel free to share your insights or embark on this learning journey with me.",
  },
  {
    title: "Excited to Attend Utah Tech Week Next Week!",
    content:
      "As the tech industry continues to evolve and shape our world, there's an exciting buzz in the air as Utah Tech Week approaches. From groundbreaking innovations to collaborative networking opportunities, this event promises to be a hub for tech enthusiasts, professionals, and curious minds alike. As someone who is passionate about technology, I can't wait to attend Utah Tech Week and immerse myself in the dynamic and ever-evolving tech landscape.",
  },
  {
    title: "Time to renew my CompTIA certs again",
    content:
      "This time I'm diving into Linux Plus! I've been working with Linux for a few years now, but I have to say, I wish I had taken this certification sooner. It's been an eye-opener to learn some of the neat tips and tricks that I hadn't come across before. I'm excited to see where this certification will take me in my career.",
  },
];

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
    pageLink.addEventListener("click", () => displayBlogPosts(i));
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

// Initial setup: Get the page number from the URL or default to page 1
const urlParams = new URLSearchParams(window.location.search);
const initialPage = parseInt(urlParams.get('page')) || 1;

// Generate blog posts and pagination for the initial page
generateBlogPosts(initialPage);
generatePagination();