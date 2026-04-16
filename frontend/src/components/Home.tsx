import React from 'react';

const Home: React.FC = () => (
  <main id="home">
    <h1 className="lg-heading">
      Samuel <span className="text-secondary">Bush</span>
    </h1>
    <h2 className="sm-heading">
      Senior IT Engineer at SecurityMetrics, Master of Computer Science
    </h2>
    <div className="icons">
      <a href="https://www.linkedin.com/in/samuelbush92/">
        <i className="fab fa-linkedin fa-2x"></i>
      </a>
      <a href="https://github.com/sbush92">
        <i className="fab fa-github fa-2x"></i>
      </a>
    </div>
  </main>
);

export default Home;
