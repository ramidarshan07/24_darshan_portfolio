import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "./components.css";

const Logs = ({ onClose, onMinimize, zIndex, onFocus, initialPos }) => {
  const [size, setSize] = useState({ width: 600, height: 500 });
  const nodeRef = React.useRef(null);

  const experienceData = [
    {
      period: "July 2024 – Present",
      company: "Software Developer - IIPL – iFlora Info Pvt. Ltd.",
      achievements: [
        "Working in a Digital Marketing, Social Media Marketing, and Web & Software Development company, contributing to multiple development and design projects.",
        "Started with WordPress Development and UI/UX Design",
        "Progressed into Frontend Development",
        "Currently working as a Full Stack Developer",
        "Managing projects and guiding junior developers with basic coding training",
      ],
    },
    {
      period: "2024 Sept – 2025 Jan",
      company: "Full Stack Development Training - Felix IT Systems",
      achievements: [
        "Completed professional training in Full Stack Development, gaining practical experience with modern web technologies and backend development.",
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
          <div className="window-title">SYSTEM_LOGS.TXT</div>
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
          minConstraints={[400, 400]}
          maxConstraints={[1000, 800]}
          onResize={(e, data) => {
            setSize({ width: data.size.width, height: data.size.height + 35 });
          }}
          resizeHandles={["se"]}
        >
          <div className="window-content">
            <div className="window-content-inner">
              <div
                className="skills-title glitch-text"
                data-text="EXPERIENCE_LOG"
              >
                EXPERIENCE_LOG
              </div>

              {experienceData.map((exp, index) => (
                <div
                  key={index}
                  className="skill-group"
                  style={{ marginBottom: "30px" }}
                >
                  <div className="skill-category">[{exp.period}]</div>
                  <div
                    className="skill-items"
                    style={{
                      fontWeight: "bold",
                      margin: "5px 0 10px 0",
                      color: "var(--white-color)",
                    }}
                  >
                    {exp.company}
                  </div>
                  <div className="skill-items" style={{ paddingLeft: "10px" }}>
                    {exp.achievements.map((item, i) => (
                      <div key={i} style={{ marginBottom: "5px" }}>
                        {">"} {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default Logs;
