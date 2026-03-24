import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "./components.css";

const Setting = ({
  onClose,
  onMinimize,
  zIndex,
  onFocus,
  initialPos,
  isSplashCursorActive,
  setIsSplashCursorActive,
  isNoiseActive,
  setIsNoiseActive,
  themeColor,
  setThemeColor,
  activeColor,
  setActiveColor,
  clockColor,
  setClockColor,
}) => {
  const [size, setSize] = useState({ width: 500, height: 550 });
  const nodeRef = useRef(null);

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
          <div className="window-title">SETTINGS.EXE</div>
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
          minConstraints={[400, 300]}
          maxConstraints={[800, 600]}
          onResize={(e, data) => {
            setSize({ width: data.size.width, height: data.size.height + 35 });
          }}
          resizeHandles={["se"]}
        >
          <div className="window-content">
            <div className="window-content-inner radar-layout">
              <div
                className="skills-title glitch-text"
                data-text="SYSTEM SETTINGS"
              >
                SYSTEM SETTINGS
              </div>

              <div className="settings-options">
                <div className="setting-section">
                  <div className="setting-section-title divider-parent">
                    <span>
                      <div className="divider-lne-horz"></div>
                    </span>
                    Cursor setting
                    <span>
                      <div className="divider-lne-horz"></div>
                    </span>
                  </div>
                  <div className="setting-item">
                    <span className="setting-item-label">SPLASH CURSOR</span>
                    <label className="toggle-wrapper toggle-wrapper-custom">
                      <input
                        type="checkbox"
                        className="toggle-checkbox"
                        checked={isSplashCursorActive}
                        onChange={() =>
                          setIsSplashCursorActive(!isSplashCursorActive)
                        }
                      />
                      <div className="toggle-container">
                        <div className="toggle-button">
                          <div className="toggle-button-circles-container"></div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="setting-section">
                  <div className="setting-section-title divider-parent">
                    <span>
                      <div className="divider-lne-horz"></div>
                    </span>
                    Screen setting
                    <span>
                      <div className="divider-lne-horz"></div>
                    </span>
                  </div>
                  <div className="setting-item">
                    <span className="setting-item-label">NOISE ON SCREEN</span>
                    <label className="toggle-wrapper toggle-wrapper-custom">
                      <input
                        type="checkbox"
                        className="toggle-checkbox"
                        checked={isNoiseActive}
                        onChange={() => setIsNoiseActive(!isNoiseActive)}
                      />
                      <div className="toggle-container">
                        <div className="toggle-button">
                          <div className="toggle-button-circles-container"></div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="setting-section">
                  <div className="setting-section-title divider-parent">
                    <span>
                      <div className="divider-lne-horz"></div>
                    </span>
                    Theme Color
                    <span>
                      <div className="divider-lne-horz"></div>
                    </span>
                  </div>
                  <div className="color-options-container">
                    <div
                      onClick={() => setThemeColor("soft-green")}
                      className="color-option"
                    >
                      <div
                        className={`color-box bg-soft-green ${themeColor === "soft-green" ? "theme-active" : ""}`}
                      ></div>
                      <span
                        className={`color-label ${themeColor === "soft-green" ? "theme-active" : ""}`}
                      >
                        Soft Green
                      </span>
                    </div>
                    <div
                      onClick={() => setThemeColor("light-gray")}
                      className="color-option"
                    >
                      <div
                        className={`color-box bg-light-gray ${themeColor === "light-gray" ? "theme-active" : ""}`}
                      ></div>
                      <span
                        className={`color-label ${themeColor === "light-gray" ? "theme-active" : ""}`}
                      >
                        Light Gray
                      </span>
                    </div>
                    <div
                      onClick={() => setThemeColor("soft-blue")}
                      className="color-option"
                    >
                      <div
                        className={`color-box bg-soft-blue ${themeColor === "soft-blue" ? "theme-active" : ""}`}
                      ></div>
                      <span
                        className={`color-label ${themeColor === "soft-blue" ? "theme-active" : ""}`}
                      >
                        Soft Blue
                      </span>
                    </div>
                  </div>
                </div>
                <div className="setting-section">
                  <div className="setting-section-title divider-parent">
                    <span>
                      <div className="divider-lne-horz"></div>
                    </span>
                    Active Color
                    <span>
                      <div className="divider-lne-horz"></div>
                    </span>
                  </div>
                  <div className="color-options-container">
                    <div
                      onClick={() => setActiveColor("neon-green")}
                      className="color-option"
                    >
                      <div
                        className={`color-box bg-neon-green ${activeColor === "neon-green" ? "color-active" : ""}`}
                      ></div>
                      <span
                        className={`color-label ${activeColor === "neon-green" ? "color-active" : ""}`}
                      >
                        Neon Green
                      </span>
                    </div>
                    <div
                      onClick={() => setActiveColor("pure-white")}
                      className="color-option"
                    >
                      <div
                        className={`color-box bg-pure-white ${activeColor === "pure-white" ? "color-active" : ""}`}
                      ></div>
                      <span
                        className={`color-label ${activeColor === "pure-white" ? "color-active" : ""}`}
                      >
                        Pure White
                      </span>
                    </div>
                    <div
                      onClick={() => setActiveColor("teal-blue")}
                      className="color-option"
                    >
                      <div
                        className={`color-box bg-teal-blue ${activeColor === "teal-blue" ? "color-active" : ""}`}
                      ></div>
                      <span
                        className={`color-label ${activeColor === "teal-blue" ? "color-active" : ""}`}
                      >
                        Teal Blue
                      </span>
                    </div>
                  </div>
                </div>
                <div className="setting-section">
                  <div className="setting-section-title divider-parent">
                    <span>
                      <div className="divider-lne-horz"></div>
                    </span>
                    Clock Color
                    <span>
                      <div className="divider-lne-horz"></div>
                    </span>{" "}
                  </div>
                  <div className="color-options-container">
                    <div
                      onClick={() => setClockColor("active-blue")}
                      className="color-option"
                    >
                      <div
                        className={`color-box bg-active-blue ${clockColor === "active-blue" ? "theme-active" : ""}`}
                      ></div>
                      <span
                        className={`color-label ${clockColor === "active-blue" ? "theme-active" : ""}`}
                      >
                        Active Blue
                      </span>
                    </div>
                    <div
                      onClick={() => setClockColor("bright-red")}
                      className="color-option"
                    >
                      <div
                        className={`color-box bg-bright-red ${clockColor === "bright-red" ? "theme-active" : ""}`}
                      ></div>
                      <span
                        className={`color-label ${clockColor === "bright-red" ? "theme-active" : ""}`}
                      >
                        Bright Red
                      </span>
                    </div>
                    <div
                      onClick={() => setClockColor("neon-pink")}
                      className="color-option"
                    >
                      <div
                        className={`color-box bg-neon-pink ${clockColor === "neon-pink" ? "theme-active" : ""}`}
                      ></div>
                      <span
                        className={`color-label ${clockColor === "neon-pink" ? "theme-active" : ""}`}
                      >
                        Neon Pink
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="setting-footernote">
                <span>⚠️&nbsp;</span>
                <p>Refreshing/Reloading the page will reset your settings</p>
                <span>&nbsp;⚠️</span>
              </div>
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default Setting;
