import React from 'react';

const About: React.FC = () => (
  <main id="about">
    <h1 className="lg-heading">About<span className="text-secondary">ME</span></h1>
    <h2 className="sm-heading">
      Team player, quick learner, and avid traveler....
    </h2>
    <section className="about-info">
      <img src="/img/portrait.jpg" alt="Samuel Bush" className="bio-image" />
      <div className="bio">
        <h3 className="text-secondary">BIO</h3>
        <p>
          I've always been a great problem solver, an independent introvert,
          and a tech geek obsessed with the latest devices. Currently, I am a
          proud graduate with a Master's degree in Computer Science from Utah
          Valley University. I started coding as a teenager, turned a hobby
          into a career after a deployment with the Army. Experienced in
          various programming languages, including JavaScript, HTML, CSS,
          Python, jQuery, and AngularJS. Continuously expanding my skill set
          and exploring machine learning and AI in my free time.
        </p>
      </div>
      <div className="job job-1">
        <h3>Masters of Computer Science</h3>
        <h6>
          <a href="https://www.uvu.edu">Utah Valley University</a> Graduated
          May 2022
        </h6>
        <p>
          Thesis Title: "Real Time Sentiment Analysis with CUDA" Led a
          groundbreaking project where I delved into real-time sentiment
          analysis of streamed data, leveraging CUDA GPUs instead of CPUs.
          This venture served as a profound learning experience, allowing me
          to master GPU programming and general-purpose GPU programming with
          CUDA. My primary objectives included building a neural network for
          sentiment analysis, gaining insights into the field of sentiment
          analysis, and exploring the potential enhancements that CUDA could
          offer over CPUs. The project focused on the computational challenges
          of real-time sentiment analysis, particularly processing large
          volumes of data from sources like Twitter with quick turnaround
          times. Results highlighted CUDA's steep learning curve and its
          suitability for specific use cases rather than general-purpose
          programming. In conclusion, I recommend the use of PyTorch or
          TensorFlow for future implementations. Throughout this journey, I
          managed to craft a robust system, totaling 1200 lines of code, and
          tackled complexities involving asynchronous communication between
          two programming languages. This experience not only honed my skills
          in GPU programming but also provided valuable insights into the
          intricate nature of sentiment analysis with dynamic streaming data.
        </p>
      </div>
      <div className="job job-2">
        <h3>Red Pepper Software</h3>
        <h6>Full Stack Developer Internship May 2018 - Mar 2019</h6>
        <p>
          Software QA Tester, evaluate projects based on required acceptance
          criteria, or test cases and implementation. Full stack development,
          collaborate with team members to research, architect and implement
          software, as well as support production systems for the following
          projects ,Utah Water Conservation, X3 Tradesmen Web Portal, Red List
          Web Application, Employer Advocates, Autosource.
        </p>
      </div>
      <div className="job job-3">
        <h3>Senior Information Technology Engineer</h3>
        <h6>Utah Valley University April 2023 - Present</h6>
        <p>
          Secured and maintained firewalls, networks, and virtual networks.
          Designed and implemented resilient infrastructure and systems
          supporting critical business. Identified, documented, and escalated
          software, design, reliability, and maintenance issues. Responded to
          escalations, audits, and other sources of information within IT and
          partner groups. Created and maintained APIs connecting critical
          systems. Skills: Ansible · Network Administration · IT systems
          development · Network Security · Python (Programming Language)
        </p>
      </div>
      <div className="job job-4">
        <h3>Site Reliability Engineer</h3>
        <h6>Utah Valley University June 2022 - November 2023</h6>
        <p>
          As an experienced Site Reliability Engineer (SRE), I have developed
          reliable software systems and scalable automated solutions to
          support digital transformations, IT operations, and on-call duties.
          I am experienced in solving problems for operational processes by
          incorporating aspects of software engineering into operations. My
          implementation of best practices for availability, reliability, and
          scalability has significantly improved software systems and
          workflows. I have expertise in system engineering, system
          administration, and IT operations to ensure timely achievement of
          project plans and goals.
        </p>
      </div>
      <div className="job job-5">
        <h3>System Administrator II</h3>
        <h6>Utah Valley University July 2019 - March 2022</h6>
        <p>
          Responsible for managing one of Utah Valley University's largest
          print servers hosting 200 printers that service 50,000 users.
          Mentoring, training and escalation support for the IT technicians of
          student computing. Monitoring system performance and troubleshooting
          issues across the enterprise including cloud operations, web
          servers, installation and configuration of software, servers,
          hardware, networks and virtualization as well as promote and adhere
          to security and compliance guidelines.
        </p>
      </div>
    </section>
  </main>
);

export default About;
