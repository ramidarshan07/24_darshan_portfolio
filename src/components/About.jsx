import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "./components.css";

const About = ({ onClose, onMinimize, zIndex, onFocus, initialPos }) => {
  const [size, setSize] = useState({ width: 500, height: 450 });
  const nodeRef = React.useRef(null);

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
          <div className="window-title">ABOUT_ME.info</div>
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
          height={size.height - 35} // subtract titlebar height
          minConstraints={[300, 300]}
          maxConstraints={[1000, 800]}
          onResize={(e, data) => {
            setSize({ width: data.size.width, height: data.size.height + 35 });
          }}
          resizeHandles={["se"]}
        >
          <div className="window-content" style={{ height: "100%" }}>
            <div className="window-content-inner">
              <div className="about-header">
                <div className="about-photo">
                  {/* Placeholder for photo */}
                  <span
                    style={{
                      color: "rgba(189, 189, 189, 1)",
                      fontSize: "2rem",
                    }}
                  >
                    DR_01
                  </span>
                </div>
                <div className="about-main-info">
                  <h2>Darshan Rami</h2>
                  <p>
                    Full Stack Developer with 1.5+ years of experience at Iflora
                    Info Pvt. Ltd. Skilled in React.js, Node.js, and MongoDB
                    with hands-on experience in building scalable web
                    applications and deploying projects on AWS.
                  </p>
                </div>
              </div>

              <div className="education-section">
                <div className="education-header">Education:</div>
                <div className="edu-item">
                  {">"} {"🎓"} B.E. in Information Technology - GTU (2020-2024)
                </div>
              </div>

              <div className="contact-info">
                <div className="contact-item">
                  {">"} Email: darshanrami.152@gmail.com
                </div>
                <div className="contact-item">{">"} Phone: 9925419677</div>
                <div className="contact-item">{">"} Node: Ahmedabad, India</div>
                <div className="contact-item">
                  {">"} LinkedIn: linkedin.com/in/darshan-rami-b735a520a
                </div>
              </div>
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default About;
