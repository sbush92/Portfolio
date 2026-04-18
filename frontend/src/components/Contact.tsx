import React from "react";

const Contact: React.FC = () => (
  <main id="contact" className="bg-overlay">
    <h1 className="lg-heading">
      Contact<span className="text-secondary">ME</span>
    </h1>
    <h2 className="sm-heading">Reach me by phone or email...</h2>
    <div className="boxes">
      <div>
        <span className="text-secondary">Email:</span> sjbush92@gmail.com
      </div>
      <div>
        <span className="text-secondary">Phone:</span> (801) 671-4292
      </div>
    </div>
  </main>
);

export default Contact;
