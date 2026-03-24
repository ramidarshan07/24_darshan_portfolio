import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "./components.css";

const Skills = ({ onClose, onMinimize, zIndex, onFocus, initialPos }) => {
  const [size, setSize] = useState({ width: 500, height: 550 });
  const nodeRef = React.useRef(null);

  const skillsData = [
    {
      category: "Frontend",
      items:
        "React.js, HTML5, CSS3, JavaScript, Responsive Design, UI Components, WordPress UI Customization",
    },
    {
      category: "Backend",
      items:
        "Node.js, Express.js, REST API Development, Authentication Systems",
    },
    {
      category: "Database",
      items: "MongoDB, CRUD Operations, Database Integration",
    },
    {
      category: "Cloud / Deployment",
      items:
        "AWS Deployment, Web Hosting, Production Deployment, Server Configuration",
    },
    {
      category: "Additional Skills",
      items:
        "UI/UX Design, WordPress Development, Graphic Designing, Video Editing, Junior Developer Training, Project Management, Technical Documentation",
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
          <div className="window-title">TECH_STACK.CFG</div>
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
          minConstraints={[350, 400]}
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
                data-text="LOADED_MODULES"
              >
                LOADED_MODULES
              </div>

              {skillsData.map((skill, index) => (
                <div key={index} className="skill-group">
                  <div className="skill-category">[{skill.category}]</div>
                  <div className="skill-items">{skill.items}</div>
                </div>
              ))}
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default Skills;
