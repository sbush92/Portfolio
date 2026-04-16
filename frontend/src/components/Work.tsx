import React from 'react';

const Work: React.FC = () => (
  <main id="work">
    <h1 className="lg-heading">My<span className="text-secondary">Work</span></h1>
    <h2 className="sm-heading">Check out some of my projects...</h2>
    <div className="projects">
      <div className="item">
        <a href="#">
          <img src="/img/projects/project6.jpg" alt="Project" />
        </a>
        <a href="https://www.samuelbush.me" className="btn-light">
          <i className="fas fa-eye"></i> Portfolio Site
        </a>
        <a href="https://github.com/sbush92/Portfolio" className="btn-dark">
          <i className="fab fa-github"></i> Github
        </a>
      </div>
      <div className="item">
        <a href="#">
          <img src="/img/projects/project2.jpg" alt="Project" />
        </a>
        <a href="https://ieeexplore.ieee.org/document/9249188" className="btn-light">
          <i className="fas fa-eye"></i> IEEE Publication
        </a>
        <a href="https://github.com/sbush92/Virtual-Machine" className="btn-dark">
          <i className="fab fa-github"></i> Github
        </a>
      </div>
      <div className="item">
        <a href="#">
          <img src="/img/projects/project3.jpg" alt="Project" />
        </a>
        <a href="https://www.overleaf.com/read/yshpttwzfgkz" className="btn-light">
          <i className="fas fa-eye"></i> Sentiment Analysis with CUDA
        </a>
        <a href="https://github.com/sbush92/Sentiment-Analysis" className="btn-dark">
          <i className="fab fa-github"></i> Github
        </a>
      </div>
      <div className="item">
        <a href="#">
          <img src="/img/projects/project4.jpg" alt="Project" />
        </a>
        <a href="https://www.overleaf.com/read/ytkvgbhtnvqx" className="btn-light">
          <i className="fas fa-eye"></i> Stable Marriage Algorithm
        </a>
        <a href="https://github.com/sbush92/Stable-Marriage" className="btn-dark">
          <i className="fab fa-github"></i> Github
        </a>
      </div>
      <div className="item">
        <a href="#">
          <img src="/img/projects/project5.jpg" alt="Project" />
        </a>
        <a href="https://www.overleaf.com/read/kbtnkkmmsjkz" className="btn-light">
          <i className="fas fa-eye"></i> Two-Wheeled-Robot
        </a>
        <a href="https://github.com/sbush92/Two-Wheeled-Robot" className="btn-dark">
          <i className="fab fa-github"></i> Github
        </a>
      </div>
      <div className="item">
        <a href="#">
          <img src="/img/projects/project6.jpg" alt="Project" />
        </a>
        <a href="https://github.com/sbush92/Dimension-Reduction" className="btn-light">
          <i className="fas fa-eye"></i> Dimension Reduction
        </a>
        <a href="https://github.com/sbush92/Dimension-Reduction/blob/main/data_reduction.pdf" className="btn-dark">
          <i className="fab fa-github"></i> Github
        </a>
      </div>
    </div>
  </main>
);

export default Work;
