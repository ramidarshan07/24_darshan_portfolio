import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "./components.css";

const Timeline = ({ onClose, onMinimize, zIndex, onFocus, initialPos }) => {
  const [size, setSize] = useState({ width: 600, height: 650 });
  const [expandedItems, setExpandedItems] = useState([1]); // Default second item as expanded (Software Engineer II)
  const nodeRef = React.useRef(null);

  const timelineData = [
    {
      id: 0,
      icon: "🎓",
      date: "2019 – 2020",
      title: "Higher Secondary Education ",
      subtitle: "(Science Stream)",
      description:
        "Completed Higher Secondary (11th & 12th) with 70% in the Science stream. Core subjects included Physics, Chemistry, and Mathematics, with Computer as an elective subject.",
      bullets: [],
    },
    {
      id: 1,
      icon: "🎓",
      date: "2020 – 2024",
      title: "B.E. Information Technology",
      subtitle: "Gandhinagar Institute of Technology (GIT)",
      description:
        "GIT Affiliated with Gujarat Technological University (GTU). Graduated with a Bachelor’s Degree in Information Technology, building a strong foundation in programming, web technologies, and software development concepts.",
      bullets: [],
    },
    {
      id: 2,
      icon: "💼",
      date: "July 2024 – Present",
      title: "Software Developer",
      subtitle: "IIPL – iFlora Info Pvt. Ltd.",
      description:
        "Working in a Digital Marketing, Social Media Marketing, and Web & Software Development company, contributing to multiple development and design projects.",
      bullets: [
        "Started with WordPress Development and UI/UX Design",
        "Progressed into Frontend Development",
        "Currently working as a Full Stack Developer",
        "Managing projects and guiding junior developers with basic coding training",
      ],
    },
    {
      id: 3,
      icon: "⚡",
      date: "2024 Sept – 2025 Jan",
      title: "Full Stack Development Training",
      subtitle: "Felix IT Systems",
      description:
        "Completed professional training in Full Stack Development, gaining practical experience with modern web technologies and backend development.",
      bullets: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "AWS Deployment",
      ],
    },
  ];

  const toggleItem = (id) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter((item) => item !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
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
          <div className="window-title">CAREER_TIMELINE.EXE</div>
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
          minConstraints={[400, 500]}
          maxConstraints={[1000, 900]}
          onResize={(e, data) => {
            setSize({ width: data.size.width, height: data.size.height + 35 });
          }}
          resizeHandles={["se"]}
        >
          <div className="window-content" style={{ overflowY: "auto" }}>
            <div className="window-content-inner">
              <div
                className="skills-title glitch-text"
                data-text="CAREER TIMELINE"
              >
                CAREER TIMELINE
              </div>
              <div className="timeline-container">
                <div className="timeline-line"></div>
                {timelineData.map((item) => (
                  <div
                    key={item.id}
                    className={`timeline-item ${expandedItems.includes(item.id) ? "active" : ""}`}
                    onClick={() => toggleItem(item.id)}
                  >
                    <div className="timeline-node"></div>
                    <div className="timeline-card">
                      <div className="timeline-date">
                        <span>{item.icon}</span>
                        <span>{item.date}</span>
                      </div>
                      <div className="timeline-title">{item.title}</div>
                      <div className="timeline-subtitle">{item.subtitle}</div>

                      {expandedItems.includes(item.id) && (
                        <div className="timeline-content">
                          {item.description && (
                            <div className="timeline-desc">
                              {item.description}
                            </div>
                          )}
                          {item.bullets.length > 0 && (
                            <div className="timeline-bullets">
                              {item.bullets.map((bullet, i) => (
                                <div key={i} className="timeline-bullet">
                                  {">"} {bullet}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default Timeline;
