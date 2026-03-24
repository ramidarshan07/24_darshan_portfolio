import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "./components.css";

const File = ({
  onClose,
  onMinimize,
  zIndex,
  onFocus,
  initialPos,
  onOpenModule,
}) => {
  const [size, setSize] = useState({ width: 650, height: 450 });
  const nodeRef = useRef(null);
  const emjoi = ">_";

  const fileSystem = {
    root: [
      { name: "System", type: "folder", icon: "📂" },
      { name: "Admin", type: "folder", icon: "📂" },
      { name: "Games", type: "folder", icon: "🎮" },
    ],
    System: [
      { name: "Terminal", type: "file", icon: emjoi, module: "terminal" },
      { name: "Code", type: "file", icon: "💻", module: "code" },
      { name: "Setting", type: "file", icon: "⚙️", module: "setting" },
    ],
    Games: [
      { name: "TicTacToe", type: "file", icon: "✖️", module: "tictactoe" },
      { name: "Snake", type: "file", icon: "🐍", module: "snake" },
    ],
    Admin: [
      { name: "About", type: "file", icon: "👤", module: "about" },
      { name: "Skills", type: "file", icon: "👨‍💻", module: "skills" },
      { name: "Radar", type: "file", icon: "📊", module: "radar" },
      { name: "Logs", type: "file", icon: "📑", module: "logs" },
      { name: "Projects", type: "file", icon: "📁", module: "projects" },
      { name: "Resume", type: "file", icon: "📄", module: "resume" },
      { name: "Timeline", type: "file", icon: "📅", module: "timeline" },
    ],
  };

  const [currentPath, setCurrentPath] = useState("root");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDoubleClick = (item) => {
    if (item.type === "folder") {
      setCurrentPath(item.name);
      setSelectedItem(null);
    } else if (item.type === "file") {
      onOpenModule(item.module);
    }
  };

  const handleBack = () => {
    if (currentPath !== "root") {
      setCurrentPath("root");
      setSelectedItem(null);
    }
  };

  const currentItems = fileSystem[currentPath] || [];

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
          <div className="window-title">FILE_MANAGER.EXE</div>
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
          minConstraints={[500, 350]}
          maxConstraints={[1000, 700]}
          onResize={(e, data) => {
            setSize({ width: data.size.width, height: data.size.height + 35 });
          }}
          resizeHandles={["se"]}
        >
          <div className="window-content" style={{ padding: 0 }}>
            <div className="file-manager-container">
              <div className="fm-toolbar">
                <button
                  className="fm-nav-btn"
                  onClick={handleBack}
                  disabled={currentPath === "root"}
                  title="Up"
                >
                  ⬆
                </button>
                <button
                  className="fm-nav-btn"
                  onClick={() => setCurrentPath("root")}
                  title="Home"
                >
                  {/* <Home size={16} /> */}
                  🏠
                </button>
                <div className="fm-address-bar">
                  C:\{currentPath === "root" ? "" : currentPath}
                </div>
              </div>

              <div className="fm-grid">
                {currentItems.map((item, index) => (
                  <div
                    key={index}
                    className={`fm-item ${selectedItem === index ? "selected" : ""}`}
                    onClick={() => setSelectedItem(index)}
                    onDoubleClick={() => handleDoubleClick(item)}
                  >
                    <div className="fm-icon">{item.icon}</div>
                    <div className="fm-name">{item.name}</div>
                  </div>
                ))}
              </div>

              <div className="fm-footer">
                <span>{currentItems.length} item(s)</span>
                <span>
                  {selectedItem !== null
                    ? `Selected: ${currentItems[selectedItem].name}`
                    : "No selection"}
                </span>
              </div>
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default File;
