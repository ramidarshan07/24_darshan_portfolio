import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "./components.css";

const Resume = ({ onClose, onMinimize, zIndex, onFocus, initialPos }) => {
  const [size, setSize] = useState({ width: 700, height: 600 });
  const nodeRef = useRef(null);

  const handleDownload = () => {
    window.open("/DarshanRami_CV.pdf", "_blank");
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-titlebar"
      bounds="parent"
      defaultPosition={initialPos}
      onStart={onFocus}
    >
      <div
        ref={nodeRef}
        className="component-window"
        onMouseDown={onFocus}
        style={{
          width: size.width,
          height: size.height,
          zIndex: zIndex,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <div className="window-titlebar">
          <div className="window-title">RESUME.txt</div>
          <div className="window-controls">
            <button
              className="control-btn"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
            >
              _
            </button>
            <button
              className="control-btn"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              X
            </button>
          </div>
        </div>

        <ResizableBox
          width={size.width}
          height={size.height - 35}
          minConstraints={[500, 400]}
          maxConstraints={[1200, 900]}
          onResize={(e, data) => {
            setSize({ width: data.size.width, height: data.size.height + 35 });
          }}
          resizeHandles={["se"]}
        >
          <div className="window-content" style={{ padding: 0 }}>
            <div className="resume-container">
              <div className="resume-top-bar">
                <div
                  className="skills-title glitch-text"
                  data-text="RESUME.txt"
                >
                  RESUME.txt
                </div>
                <button
                  className="resume-download-btn"
                  onClick={handleDownload}
                >
                  📥 DOWNLOAD
                </button>
              </div>

              <div className="resume-intro-box">
                <div className="resume-name">======= DARSHAN RAMI =======</div>
                <div className="resume-role">Web Developer</div>
                <div className="resume-contact">
                  +91 99254 19677 • darshanrami.152@gmail.com • Ahmedabad
                </div>
              </div>

              <div className="resume-section">
                <div className="resume-section-title">ABOUT ME</div>
                <p>
                  I'm a passionate web developer with hands-on experience in
                  WordPress, and frontend coding. I create user-friendly
                  websites that are both visually appealing and optimized for
                  search engines.
                </p>
              </div>

              <div className="resume-section">
                <div className="resume-section-title">EXPERIENCE</div>

                <div className="resume-entry">
                  <div className="resume-date">[01 JUNE 2024 - PRESENT]</div>
                  <div className="resume-company">
                    Iflora Info Pvt Ltd - Web Developer
                  </div>
                  <ul className="resume-entry-details">
                    <li>
                      Developing responsive and dynamic web interfaces using
                      React.js, HTML5, CSS3, and Bootstrap.
                    </li>
                    <li>
                      Implementing clean and reusable UI components to enhance
                      user experience.
                    </li>
                    <li>
                      Collaborating on website projects involving frontend
                      development, API integration, and performance
                      optimization.
                    </li>
                  </ul>
                </div>

                <div className="resume-entry">
                  <div className="resume-date">[JULY 2024 - JANUARY 2025]</div>
                  <div className="resume-company">
                    Felix IT System - Full Stack Development
                  </div>
                  <ul className="resume-entry-details">
                    <li>
                      Completed training covering both frontend and backend
                      technologies.
                    </li>
                    <li>MERN Stack: Node.js, Express.js, MongoDB, React.js.</li>
                  </ul>
                </div>
              </div>

              <div className="resume-section">
                <div className="resume-section-title">PROJECTS</div>
                <div className="resume-entry">
                  <div className="resume-company">
                    Salon Management Web Application
                  </div>
                  <div className="resume-entry-details">
                    Technologies: React.js, HTML5, CSS3, JavaScript (ES6), REST
                    APIs.
                    <br />
                    Implemented features like user management, dynamic package
                    control, and API-based data handling.
                  </div>
                </div>
              </div>

              <div className="resume-section">
                <div className="resume-section-title">EDUCATION</div>
                <div className="resume-entry">
                  <div className="resume-date">[2020 - 2024]</div>
                  <div className="resume-company">
                    Bachelor of Engineering (B.E.) Information Technology (IT)
                  </div>
                  <div className="resume-entry-details">
                    Gandhinagar Institute of Technology
                  </div>
                </div>
              </div>

              <div className="resume-section">
                <div className="resume-section-title">TECHNICAL SKILLS</div>
                <div className="resume-skills-grid">
                  <div className="resume-skill-item">
                    <span className="skill-check">✓</span>
                    <span>
                      Frontend: HTML5, CSS3, ES6+, React.js, Bootstrap, Tailwind
                    </span>
                  </div>
                  <div className="resume-skill-item">
                    <span className="skill-check">✓</span>
                    <span>Backend: Node.js, Express.js, MongoDB</span>
                  </div>
                  <div className="resume-skill-item">
                    <span className="skill-check">✓</span>
                    <span>Others: WordPress, SEO, UI Design</span>
                  </div>
                </div>
              </div>

              <div className="resume-section">
                <div className="resume-section-title">LANGUAGES</div>
                <div className="resume-skills-grid">
                  <div className="resume-skill-item">
                    <span className="skill-check">✓</span> Hindi
                  </div>
                  <div className="resume-skill-item">
                    <span className="skill-check">✓</span> Gujarati
                  </div>
                  <div className="resume-skill-item">
                    <span className="skill-check">✓</span> English
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default Resume;
