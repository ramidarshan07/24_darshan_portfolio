import { useState, useEffect } from "react";
import "./pages.css";

const LoadingScreen = ({ onComplete }) => {
  const [logs, setLogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  const logSequence = [
    { text: "BIOS v3.14 - Darshan Systems Inc.", color: "white" },
    { text: "Checking RAM......... 640KB OK", color: "rgba(0, 255, 64, 1)" },
    { text: "Detecting drives......", color: "white" },
    { text: "C:\\ - 500GB SSD [HEALTHY]", color: "rgba(0, 255, 64, 1)" },
    {
      text: "D:\\ - Portfolio Archive [MOUNTED]",
      color: "rgba(0, 255, 64, 1)",
    },
    { text: " ", color: "white" },
    { text: "Loading DR-OS Kernel...............", color: "white" },
    {
      text: "Initializing network interfaces... OK",
      color: "rgba(0, 255, 64, 1)",
    },
    {
      text: "Starting display driver... CRT_MODE ACTIVE",
      color: "rgba(0, 255, 64, 1)",
    },
    {
      text: "Loading modules: [React] [Vite] [NodeJS] [Tailwind]",
      color: "white",
    },
    {
      text: "Loading AI subsystems: [OpenAI] [RAG] [Gemini]",
      color: "white",
    },
    { text: " ", color: "white" },
    { text: "DR-OS v6.0 - All Systems Operational", color: "gold-box" },
    { text: " ", color: "white" },
    { text: "Launching desktop environment...", color: "white" },
  ];

  useEffect(() => {
    if (currentIndex < logSequence.length) {
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, logSequence[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
        setProgress((prev) =>
          Math.min(
            100,
            Math.floor(((currentIndex + 1) / logSequence.length) * 100),
          ),
        );
      }, 600);
      return () => clearTimeout(timer);
    } else if (progress === 100) {
      const timer = setTimeout(() => {
        setShowDialog(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, progress]);

  if (showDialog) {
    return (
      <div className="loading-screen-container">
        {/* <div className="crt-overlay">
          <div className="scanline"></div>
        </div> */}
        <div className="welcome-dialog">
          <div className="dialog-content">
            <h1 className="main-title blink-text glitch" data-text="DARSHAN">
              DARSHAN
            </h1>
            <p className="subtitle">Welcome to DR-OS v6.0</p>
            <p className="description">
              Full Stack Developer - 1.5+ yrs experiência - Iflora info pvt.
              ltd.
            </p>

            <div className="cta-buttons">
              <button className="cta-btn explore-btn" onClick={onComplete}>
                <span className="btn-icon">▶</span>
                EXPLORE PORTFOLIO
              </button>
            </div>

            <div className="footer-note">🟢 System Online • Proceed</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="loading-screen-container">
      <div className="crt-overlay">
        <div className="scanline"></div>
      </div>
      <div className="terminal-container">
        <div className="logs">
          {logs.map((log, index) => {
            if (log.color === "gold-box") {
              return (
                <div key={index} className="gold-box">
                  <div className="corner top-left"></div>
                  <div className="corner top-right"></div>
                  <div className="corner bottom-left"></div>
                  <div className="corner bottom-right"></div>
                  <div className="gold-box-content">
                    <span className="bracket">[</span>
                    {log.text}
                    <span className="bracket">]</span>
                  </div>
                </div>
              );
            }
            return (
              <div
                key={index}
                className="log-line"
                style={{
                  color: log.color,
                }}
              >
                {log.text}
              </div>
            );
          })}
          {currentIndex < logSequence.length && (
            <span className="cursor">|</span>
          )}
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <div className="progress-text">LOADING... {progress}%</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
