import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import { Play, Trash2, XCircle } from "lucide-react";
import "./components.css";

const Code = ({ onClose, onMinimize, zIndex, onFocus, initialPos }) => {
  const [size, setSize] = useState({ width: 600, height: 500 });
  const nodeRef = useRef(null);

  const initialCode = `// Write JavaScript here!
// Press RUN to execute.

console.log("Hello from DR-OS! 😎");

const greet = (name) => \`Welcome, \${name}!\`;
console.log(greet("Visitor"));`;

  const [code, setCode] = useState(initialCode);
  const [outputs, setOutputs] = useState([]);
  const [error, setError] = useState(null);

  const handleRun = () => {
    setOutputs([]);
    setError(null);
    const logs = [];

    // Custom console.log to capture output
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      logs.push(
        args
          .map((arg) =>
            typeof arg === "object"
              ? JSON.stringify(arg, null, 2)
              : String(arg),
          )
          .join(" "),
      );
    };

    try {
      // eslint-disable-next-line no-eval
      eval(code);
      setOutputs(logs);
    } catch (err) {
      setError(err.message);
    } finally {
      console.log = originalLog;
      console.error = originalError;
    }
  };

  const handleClear = () => {
    setOutputs([]);
    setError(null);
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
        className="component-window code-playground-window"
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
          <div className="window-title">CODE_PLAYGROUND.JS</div>
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
          maxConstraints={[1200, 800]}
          onResize={(e, data) => {
            setSize({ width: data.size.width, height: data.size.height + 35 });
          }}
          resizeHandles={["se"]}
        >
          <div className="window-content">
            <div className="code-playground-container">
              <div
                className="play-title glitch-text"
                data-text="CODE_PLAYGROUND.JS - #WRITE & RUN JAVASCRIPT"
              >
                CODE_PLAYGROUND.JS - #WRITE & RUN JAVASCRIPT
              </div>

              <div className="code-editor-wrapper">
                <textarea
                  className="code-textarea"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck="false"
                />
              </div>

              <div className="code-actions">
                <button className="code-btn run-btn" onClick={handleRun}>
                  <Play size={14} fill="currentColor" />
                  RUN
                </button>
                <button className="code-btn clear-btn" onClick={handleClear}>
                  <Trash2 size={14} />
                  CLEAR
                </button>
              </div>

              <div className="output-section">
                <div className="output-label">OUTPUT:</div>
                <div className="output-content">
                  {error ? (
                    <div className="error-message">
                      <XCircle size={14} className="error-icon" />
                      <span>Error: {error}</span>
                    </div>
                  ) : (
                    outputs.map((line, index) => (
                      <div key={index} className="output-line">
                        {line}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default Code;
