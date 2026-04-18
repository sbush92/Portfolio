import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Work: React.FC = () => (
  <main id="work" className="bg-overlay">
    <h1 className="lg-heading">
      My<span className="text-secondary">Work</span>
    </h1>
    <h2 className="sm-heading">Check out some of my projects...</h2>
    <div className="projects">
      <div className="item">
        <img src="/img/projects/project6.jpg" alt="Project" />
        <a href="https://www.samuelbush.me" className="btn-light">
          <VisibilityIcon style={{ verticalAlign: "middle" }} /> Portfolio Site
        </a>
        <a href="https://github.com/sbush92/Portfolio" className="btn-dark">
          <GitHubIcon style={{ verticalAlign: "middle" }} /> GitHub
        </a>
      </div>
      <div className="item">
        <img src="/img/projects/project2.jpg" alt="Project" />
        <a
          href="https://ieeexplore.ieee.org/document/9249188"
          className="btn-light"
        >
          <VisibilityIcon style={{ verticalAlign: "middle" }} /> IEEE
          Publication
        </a>
        <a
          href="https://github.com/sbush92/Virtual-Machine"
          className="btn-dark"
        >
          <GitHubIcon style={{ verticalAlign: "middle" }} /> Github
        </a>
      </div>
      <div className="item">
        <img src="/img/projects/project3.jpg" alt="Project" />
        <a
          href="https://www.overleaf.com/read/yshpttwzfgkz"
          className="btn-light"
        >
          <VisibilityIcon style={{ verticalAlign: "middle" }} /> Sentiment
          Analysis with CUDA
        </a>
        <a
          href="https://github.com/sbush92/Sentiment-Analysis"
          className="btn-dark"
        >
          <GitHubIcon style={{ verticalAlign: "middle" }} /> Github
        </a>
      </div>
      <div className="item">
        <img src="/img/projects/project4.jpg" alt="Project" />
        <a
          href="https://www.overleaf.com/read/ytkvgbhtnvqx"
          className="btn-light"
        >
          <VisibilityIcon style={{ verticalAlign: "middle" }} /> Stable Marriage
          Algorithm
        </a>
        <a
          href="https://github.com/sbush92/Stable-Marriage"
          className="btn-dark"
        >
          <GitHubIcon style={{ verticalAlign: "middle" }} /> Github
        </a>
      </div>
      <div className="item">
        <img src="/img/projects/project5.jpg" alt="Project" />
        <a
          href="https://www.overleaf.com/read/kbtnkkmmsjkz"
          className="btn-light"
        >
          <VisibilityIcon style={{ verticalAlign: "middle" }} />{" "}
          Two-Wheeled-Robot
        </a>
        <a
          href="https://github.com/sbush92/Two-Wheeled-Robot"
          className="btn-dark"
        >
          <GitHubIcon style={{ verticalAlign: "middle" }} /> Github
        </a>
      </div>
      <div className="item">
        <img src="/img/projects/project6.jpg" alt="Project" />
        <a
          href="https://github.com/sbush92/Dimension-Reduction"
          className="btn-light"
        >
          <VisibilityIcon style={{ verticalAlign: "middle" }} /> Dimension
          Reduction
        </a>
        <a
          href="https://github.com/sbush92/Dimension-Reduction/blob/main/data_reduction.pdf"
          className="btn-dark"
        >
          <GitHubIcon style={{ verticalAlign: "middle" }} /> Github
        </a>
      </div>
    </div>
  </main>
);

export default Work;
