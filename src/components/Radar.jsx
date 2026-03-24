import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "./components.css";

const Radar = ({ onClose, onMinimize, zIndex, onFocus, initialPos }) => {
  const [size, setSize] = useState({ width: 550, height: 600 });
  const nodeRef = React.useRef(null);

  const skillsData = [
    { label: "Frontend", value: 95 },
    { label: "Backend", value: 70 },
    { label: "Database", value: 70 },
    { label: "Cloud / Deployment", value: 85 },
    { label: "UI / UX", value: 96 },
    { label: "Programming", value: 90 },
  ];

  // Radar Chart helper (SVG based)
  const centerX = 150;
  const centerY = 150;
  const radius = 100;
  const angleStep = (Math.PI * 2) / skillsData.length;

  const points = skillsData
    .map((skill, i) => {
      const r = (skill.value / 100) * radius;
      const x = centerX + r * Math.cos(i * angleStep - Math.PI / 2);
      const y = centerY + r * Math.sin(i * angleStep - Math.PI / 2);
      return `${x},${y}`;
    })
    .join(" ");

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1];

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
          <div className="window-title">SKILLS_RADAR.EXE</div>
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
          maxConstraints={[1000, 800]}
          onResize={(e, data) => {
            setSize({ width: data.size.width, height: data.size.height + 35 });
          }}
          resizeHandles={["se"]}
        >
          <div className="window-content">
            <div className="window-content-inner radar-layout">
              <div
                className="skills-title glitch-text"
                data-text="SKILLS_RADAR.EXE"
              >
                SKILLS_RADAR.EXE
              </div>

              {/* Radar Chart SVG */}
              <div className="radar-container">
                <svg width="300" height="300" viewBox="0 0 300 300">
                  {/* Grid Lines */}
                  {gridLevels.map((level, idx) => (
                    <polygon
                      key={idx}
                      className="radar-grid"
                      points={skillsData
                        .map((_, i) => {
                          const r = level * radius;
                          const x =
                            centerX + r * Math.cos(i * angleStep - Math.PI / 2);
                          const y =
                            centerY + r * Math.sin(i * angleStep - Math.PI / 2);
                          return `${x},${y}`;
                        })
                        .join(" ")}
                    />
                  ))}
                  {/* Axis lines */}
                  {skillsData.map((_, i) => {
                    const x =
                      centerX + radius * Math.cos(i * angleStep - Math.PI / 2);
                    const y =
                      centerY + radius * Math.sin(i * angleStep - Math.PI / 2);
                    return (
                      <line
                        key={i}
                        x1={centerX}
                        y1={centerY}
                        x2={x}
                        y2={y}
                        className="radar-grid"
                      />
                    );
                  })}
                  {/* Data Shape */}
                  <polygon points={points} className="radar-shape" />
                  {/* Labels */}
                  {skillsData.map((skill, i) => {
                    const x =
                      centerX +
                      (radius + 25) * Math.cos(i * angleStep - Math.PI / 2);
                    const y =
                      centerY +
                      (radius + 20) * Math.sin(i * angleStep - Math.PI / 2);
                    return (
                      <text
                        key={i}
                        x={x}
                        y={y}
                        textAnchor="middle"
                        className="radar-label"
                      >
                        {skill.label}
                      </text>
                    );
                  })}
                </svg>
              </div>

              {/* Progress Bars */}
              <div className="progress-section">
                {skillsData.map((skill, index) => (
                  <div key={index} className="progress-item">
                    <span className="progress-label">{skill.label}</span>
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${skill.value}%` }}
                      ></div>
                    </div>
                    <span className="progress-percent">{skill.value}%</span>
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

export default Radar;
