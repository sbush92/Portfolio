import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Home: React.FC = () => (
  <main id="home" className="bg-overlay">
    <h1 className="lg-heading" data-testid="home-heading">
      Samuel <span className="text-secondary">Bush</span>
    </h1>
    <h2 className="sm-heading">
      Senior IT Engineer at SecurityMetrics, Master of Computer Science
    </h2>
    <div className="icons">
      <a href="https://www.linkedin.com/in/samuelbush92/" aria-label="LinkedIn">
        <LinkedInIcon fontSize="large" />
      </a>
      <a href="https://github.com/sbush92" aria-label="GitHub">
        <GitHubIcon fontSize="large" />
      </a>
    </div>
  </main>
);

export default Home;
