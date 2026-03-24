import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "./components.css";

const Projects = ({ onClose, onMinimize, zIndex, onFocus, initialPos }) => {
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [selectedProject, setSelectedProject] = useState(null);
  const nodeRef = React.useRef(null);

  const projectsData = [
    {
      id: 1,
      title: "iFloriana",
      subtitle: "Salon & Spa Management Software",
      icon: "✂️",
      tags: ["React.js", "Vite", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
      challenge:
        "Managing salon appointments, staff schedules, and inventory manually was time-consuming and prone to errors.",
      solution:
        "Developed a comprehensive frontend system for appointment booking, employee oversight, and automated billing/reporting.",
      impact: [
        "Handled full frontend development",
        "Streamlined booking process",
        "Improved inventory tracking accuracy",
      ],
    },
    {
      id: 2,
      title: "Interior Quotation System",
      subtitle: "Full-stack Interior Design Solution",
      icon: "🏠",
      tags: [
        "React.js",
        "Vite",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],
      challenge:
        "Interior designers struggled with manual quotation creation and following up with clients effectively.",
      solution:
        "Built a full-stack platform to generate professional PDF quotations, manage products, and track employee performance with automated email follow-ups.",
      impact: [
        "Created end-to-end full-stack solution",
        "Automated PDF generation and mailing",
        "Enhanced follow-up management",
      ],
    },
    {
      id: 3,
      title: "Texspin Project Tracker",
      subtitle: "Enterprise Internal Project Management",
      icon: "📊",
      tags: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Firebase",
        "Backend Development",
      ],
      challenge:
        "Difficulty in tracking multiple in-house projects and coordinating team tasks across the organization.",
      solution:
        "Engineered a robust backend with secure MongoDB integration to track projects, manage tasks, and organize Minutes of Meetings (MOM).",
      impact: [
        "Handled complete backend architecture",
        "Enhanced data security with Firebase",
        "Optimized task tracking for Texspin",
      ],
    },
    {
      id: 4,
      title: "Wealth Management Suite",
      subtitle: "Personal Finance & Utility Tracker",
      icon: "💰",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Bootstrap"],
      challenge:
        "Managing personal finances, vehicle logs, and notes across different apps was disorganized.",
      solution:
        "Developed a unified personal finance dashboard featuring expense/loan tracking, savings monitoring, and integrated utility modules.",
      impact: [
        "Built full-stack personal tool",
        "Consolidated finance & utility logs",
        "Implemented custom game modules",
      ],
    },
    {
      id: 5,
      title: "Modern Calculator",
      subtitle: "Interactive Calculation Tool",
      icon: "🔢",
      tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
      challenge:
        "Creating a responsive and user-friendly calculation tool for daily tasks.",
      solution:
        "Designed an interactive calculator with a clean UI using JavaScript logic and Bootstrap styling.",
      impact: [
        "Precise calculation logic",
        "Fully responsive design",
        "Clean and minimal UI",
      ],
    },
    {
      id: 6,
      title: "Recipe Finder",
      subtitle: "Digital Cookbook & Search Engine",
      icon: "🍔",
      tags: ["JavaScript", "APIs", "HTML5", "CSS3", "Bootstrap"],
      challenge:
        "Difficulty finding specific recipes and ingredients quickly from various sources.",
      solution:
        "Integrated external recipe APIs to allow users to search and discover diverse food recipes instantly.",
      impact: [
        "Seamless API integration",
        "Fast search performance",
        "Wide range of food discovery",
      ],
    },
    {
      id: 7,
      title: "NewsFlash",
      subtitle: "Real-time News Aggregator",
      icon: "📰",
      tags: ["React.js", "Vite", "Bootstrap", "REST API"],
      challenge:
        "Keeping up with the latest global news in a single, fast, and organized interface.",
      solution:
        "Built a dynamic news application that fetches and displays live headlines from across the world using a REST API.",
      impact: [
        "Real-time data fetching",
        "Responsive mobile-first UI",
        "User-friendly news categories",
      ],
    },
  ];

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
          <div className="window-title">./PROJECTS/CASE_STUDIES</div>
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
          minConstraints={[600, 400]}
          maxConstraints={[1200, 900]}
          onResize={(e, data) => {
            setSize({ width: data.size.width, height: data.size.height + 35 });
          }}
          resizeHandles={["se"]}
        >
          <div className="window-content">
            <div className="window-content-inner">
              {!selectedProject ? (
                <>
                  <div className="titel-con-top">
                    <div
                      className="skills-title glitch-text"
                      data-text="PROJECT_files"
                    >
                      PROJECT_files
                    </div>
                    <button
                      className="ln-btn"
                      onClick={() =>
                        window.open(
                          "https://github.com/ramidarshan07",
                          "_blank",
                        )
                      }
                    >
                      👾 GitHub
                    </button>
                  </div>

                  <div className="projects-grid-header">
                    Click a project to view the full case study:
                  </div>
                  <div className="projects-grid">
                    {projectsData.map((project) => (
                      <div
                        key={project.id}
                        className="project-card"
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="project-card-icon">{project.icon}</div>
                        <div className="project-card-info">
                          <div className="project-card-title">
                            {project.title}
                          </div>
                          <div className="project-card-subtitle">
                            {project.subtitle}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="project-detail">
                  <button
                    className="back-btn"
                    onClick={() => setSelectedProject(null)}
                  >
                    ← BACK
                  </button>
                  <div className="project-detail-header">
                    <span className="project-detail-icon">
                      {selectedProject.icon}
                    </span>
                    <h2 className="project-detail-title">
                      {selectedProject.title}
                    </h2>
                  </div>
                  <p className="project-detail-subtitle">
                    {selectedProject.subtitle}
                  </p>

                  <div className="project-tags">
                    {selectedProject.tags.map((tag, i) => (
                      <span key={i} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="project-section">
                    <div className="skill-category">CHALLENGE:</div>
                    <div className="project-section-content">
                      {selectedProject.challenge}
                    </div>
                  </div>

                  <div className="project-section">
                    <div className="skill-category">SOLUTION:</div>
                    <div className="project-section-content">
                      {selectedProject.solution}
                    </div>
                  </div>

                  <div className="project-section">
                    <div className="skill-category">IMPACT:</div>
                    <div className="project-section-content">
                      {selectedProject.impact.map((item, i) => (
                        <div key={i} className="impact-item">
                          <span className="impact-check">✓</span> {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default Projects;
