import React from 'react';

const Blog: React.FC = () => (
  <main id="blog">
    <h1 className="lg-heading">Tech<span className="text-secondary">Blog</span></h1>
    <h2 className="sm-heading">Greetings tech enthusiasts, learners, and fellow explorers!</h2>
    <section id="blog-posts" className="blog-posts"></section>
    <section id="pagination" className="pagination"></section>
  </main>
);

export default Blog;
