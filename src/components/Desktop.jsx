import { useState, useEffect, useRef } from "react";
import "./components.css";
import { FaUser } from "react-icons/fa";
import About from "./About";
import Skills from "./Skills";
import Radar from "./Radar";
import Logs from "./Logs";
import Projects from "./Projects";
import Timeline from "./Timeline";
import Tictactoe from "./Tictactoe";
import Noise from "./Noise";
import SplashCursor from "@/SplashCursor";
import Setting from "./Setting";
import Terminal from "./Terminal";
import Code from "./Code";
import Snake from "./Snake";
import Clip from "./Clip";
import File from "./File";
import Resume from "./Resume";

const Desktop = () => {
  const [time, setTime] = useState(new Date());
  const [isMuted, setIsMuted] = useState(false);
  const emjoi = ">_";

  // Added States for Settings
  const [isSplashCursorActive, setIsSplashCursorActive] = useState(true);
  const [isNoiseActive, setIsNoiseActive] = useState(false);

  // Added States for Colors
  const [themeColor, setThemeColor] = useState("soft-green");
  const [activeColor, setActiveColor] = useState("neon-green");
  const [clockColor, setClockColor] = useState("active-blue");

  useEffect(() => {
    // Theme Color
    if (themeColor === "soft-green") {
      document.documentElement.style.setProperty(
        "--soft-pastel-green",
        "rgb(144, 238, 144)",
      );
    } else if (themeColor === "light-gray") {
      document.documentElement.style.setProperty(
        "--soft-pastel-green",
        "rgb(194, 194, 194)",
      );
    } else if (themeColor === "soft-blue") {
      document.documentElement.style.setProperty(
        "--soft-pastel-green",
        "rgb(151, 221, 248)",
      );
    }
  }, [themeColor]);

  useEffect(() => {
    // Active Color
    if (activeColor === "neon-green") {
      document.documentElement.style.setProperty("--terminal-green", "#33ff33");
    } else if (activeColor === "pure-white") {
      document.documentElement.style.setProperty("--terminal-green", "#ffffff");
    } else if (activeColor === "teal-blue") {
      document.documentElement.style.setProperty("--terminal-green", "#00d9ff");
    }
  }, [activeColor]);

  useEffect(() => {
    // Clock Color
    if (clockColor === "active-blue") {
      document.documentElement.style.setProperty(
        "--time-color",
        "rgb(4, 0, 255)",
      );
    } else if (clockColor === "bright-red") {
      document.documentElement.style.setProperty(
        "--time-color",
        "rgb(255, 0, 0)",
      );
    } else if (clockColor === "neon-pink") {
      document.documentElement.style.setProperty(
        "--time-color",
        "rgb(255, 0, 221)",
      );
    }
  }, [clockColor]);

  // Window states
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAboutMinimized, setIsAboutMinimized] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isSkillsMinimized, setIsSkillsMinimized] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
  const [isRadarOpen, setIsRadarOpen] = useState(false);
  const [isRadarMinimized, setIsRadarMinimized] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [activeWindow, setActiveWindow] = useState(null);
  const [windowPositions, setWindowPositions] = useState({
    about: { x: 0, y: 0 },
    skills: { x: 0, y: 0 },
    radar: { x: 0, y: 0 },
    logs: { x: 0, y: 0 },
    projects: { x: 0, y: 0 },
    timeline: { x: 0, y: 0 },
    tictactoe: { x: 0, y: 0 },
    setting: { x: 0, y: 0 },
    terminal: { x: 50, y: 50 },
    code: { x: 0, y: 0 },
    snake: { x: 0, y: 0 },
    file: { x: 0, y: 0 },
    resume: { x: 0, y: 0 },
  });
  const [isLogsOpen, setIsLogsOpen] = useState(false);
  const [isLogsMinimized, setIsLogsMinimized] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isProjectsMinimized, setIsProjectsMinimized] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isTimelineMinimized, setIsTimelineMinimized] = useState(false);
  const [isTictactoeOpen, setIsTictactoeOpen] = useState(false);
  const [isTictactoeMinimized, setIsTictactoeMinimized] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isSettingMinimized, setIsSettingMinimized] = useState(false);
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [isCodeMinimized, setIsCodeMinimized] = useState(false);
  const [isSnakeOpen, setIsSnakeOpen] = useState(false);
  const [isSnakeMinimized, setIsSnakeMinimized] = useState(false);
  const [isClippyOpen, setIsClippyOpen] = useState(false);
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [isFileMinimized, setIsFileMinimized] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isResumeMinimized, setIsResumeMinimized] = useState(false);
  const startMenuRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    const handleClickOutside = (event) => {
      if (
        startMenuRef.current &&
        !startMenuRef.current.contains(event.target)
      ) {
        setIsStartMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Clippy Auto-Trigger after 2 seconds
    const clippyTimer = setTimeout(() => {
      setIsClippyOpen(true);
    }, 2000);

    return () => {
      clearInterval(timer);
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(clippyTimer);
    };
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const getRandomPosition = () => {
    const maxX = window.innerWidth - 600;
    const maxY = window.innerHeight - 500;
    return {
      x: Math.floor(Math.random() * Math.max(0, maxX)),
      y: Math.floor(Math.random() * Math.max(0, maxY)),
    };
  };

  const handleOpenAbout = () => {
    if (!isAboutOpen) {
      setWindowPositions((prev) => ({ ...prev, about: getRandomPosition() }));
    }
    setIsAboutOpen(true);
    setIsAboutMinimized(false);
    setActiveWindow("about");
  };

  const handleOpenSkills = () => {
    if (!isSkillsOpen) {
      setWindowPositions((prev) => ({ ...prev, skills: getRandomPosition() }));
    }
    setIsSkillsOpen(true);
    setIsSkillsMinimized(false);
    setActiveWindow("skills");
  };

  const handleOpenRadar = () => {
    if (!isRadarOpen) {
      setWindowPositions((prev) => ({ ...prev, radar: getRandomPosition() }));
    }
    setIsRadarOpen(true);
    setIsRadarMinimized(false);
    setActiveWindow("radar");
  };

  const handleOpenLogs = () => {
    if (!isLogsOpen) {
      setWindowPositions((prev) => ({ ...prev, logs: getRandomPosition() }));
    }
    setIsLogsOpen(true);
    setIsLogsMinimized(false);
    setActiveWindow("logs");
  };

  const handleOpenProjects = () => {
    if (!isProjectsOpen) {
      setWindowPositions((prev) => ({
        ...prev,
        projects: getRandomPosition(),
      }));
    }
    setIsProjectsOpen(true);
    setIsProjectsMinimized(false);
    setActiveWindow("projects");
  };

  const handleOpenTimeline = () => {
    if (!isTimelineOpen) {
      setWindowPositions((prev) => ({
        ...prev,
        timeline: getRandomPosition(),
      }));
    }
    setIsTimelineOpen(true);
    setIsTimelineMinimized(false);
    setActiveWindow("timeline");
  };

  const handleOpenTictactoe = () => {
    if (!isTictactoeOpen) {
      setWindowPositions((prev) => ({
        ...prev,
        tictactoe: getRandomPosition(),
      }));
    }
    setIsTictactoeOpen(true);
    setIsTictactoeMinimized(false);
    setActiveWindow("tictactoe");
  };

  const handleOpenSetting = () => {
    if (!isSettingOpen) {
      setWindowPositions((prev) => ({
        ...prev,
        setting: getRandomPosition(),
      }));
    }
    setIsSettingOpen(true);
    setIsSettingMinimized(false);
    setActiveWindow("setting");
  };

  const handleOpenTerminal = () => {
    if (!isTerminalOpen) {
      setWindowPositions((prev) => ({
        ...prev,
        terminal: getRandomPosition(),
      }));
    }
    setIsTerminalOpen(true);
    setIsTerminalMinimized(false);
    setActiveWindow("terminal");
  };

  const handleOpenCode = () => {
    if (!isCodeOpen) {
      setWindowPositions((prev) => ({
        ...prev,
        code: getRandomPosition(),
      }));
    }
    setIsCodeOpen(true);
    setIsCodeMinimized(false);
    setActiveWindow("code");
  };

  const handleOpenSnake = () => {
    if (!isSnakeOpen) {
      setWindowPositions((prev) => ({
        ...prev,
        snake: getRandomPosition(),
      }));
    }
    setIsSnakeOpen(true);
    setIsSnakeMinimized(false);
    setActiveWindow("snake");
  };

  const handleOpenFile = () => {
    if (!isFileOpen) {
      setWindowPositions((prev) => ({
        ...prev,
        file: getRandomPosition(),
      }));
    }
    setIsFileOpen(true);
    setIsFileMinimized(false);
    setActiveWindow("file");
  };

  const handleOpenResume = () => {
    if (!isResumeOpen) {
      setWindowPositions((prev) => ({
        ...prev,
        resume: getRandomPosition(),
      }));
    }
    setIsResumeOpen(true);
    setIsResumeMinimized(false);
    setActiveWindow("resume");
  };

  const handleOpenModule = (moduleName) => {
    switch (moduleName) {
      case "about":
        handleOpenAbout();
        break;
      case "skills":
        handleOpenSkills();
        break;
      case "radar":
        handleOpenRadar();
        break;
      case "logs":
        handleOpenLogs();
        break;
      case "projects":
        handleOpenProjects();
        break;
      case "timeline":
        handleOpenTimeline();
        break;
      case "tictactoe":
        handleOpenTictactoe();
        break;
      case "setting":
        handleOpenSetting();
        break;
      case "code":
      case "playground":
        handleOpenCode();
        break;
      case "terminal":
        handleOpenTerminal();
        break;
      case "snake":
        handleOpenSnake();
        break;
      case "file":
        handleOpenFile();
        break;
      case "resume":
        handleOpenResume();
        break;
      default:
        break;
    }
  };

  const handleToggleTerminal = () => {
    if (isTerminalMinimized) {
      setIsTerminalMinimized(false);
      setActiveWindow("terminal");
    } else {
      setIsTerminalMinimized(true);
    }
  };

  const handleToggleAbout = () => {
    if (isAboutMinimized) {
      setIsAboutMinimized(false);
      setActiveWindow("about");
    } else {
      setIsAboutMinimized(true);
    }
  };

  const handleToggleSkills = () => {
    if (isSkillsMinimized) {
      setIsSkillsMinimized(false);
      setActiveWindow("skills");
    } else {
      setIsSkillsMinimized(true);
    }
  };

  const handleToggleRadar = () => {
    if (isRadarMinimized) {
      setIsRadarMinimized(false);
      setActiveWindow("radar");
    } else {
      setIsRadarMinimized(true);
    }
  };

  const handleToggleLogs = () => {
    if (isLogsMinimized) {
      setIsLogsMinimized(false);
      setActiveWindow("logs");
    } else {
      setIsLogsMinimized(true);
    }
  };

  const handleToggleProjects = () => {
    if (isProjectsMinimized) {
      setIsProjectsMinimized(false);
      setActiveWindow("projects");
    } else {
      setIsProjectsMinimized(true);
    }
  };

  const handleToggleTimeline = () => {
    if (isTimelineMinimized) {
      setIsTimelineMinimized(false);
      setActiveWindow("timeline");
    } else {
      setIsTimelineMinimized(true);
    }
  };

  const handleToggleTictactoe = () => {
    if (isTictactoeMinimized) {
      setIsTictactoeMinimized(false);
      setActiveWindow("tictactoe");
    } else {
      setIsTictactoeMinimized(true);
    }
  };

  const handleToggleSetting = () => {
    if (isSettingMinimized) {
      setIsSettingMinimized(false);
      setActiveWindow("setting");
    } else {
      setIsSettingMinimized(true);
    }
  };

  const handleToggleCode = () => {
    if (isCodeMinimized) {
      setIsCodeMinimized(false);
      setActiveWindow("code");
    } else {
      setIsCodeMinimized(true);
    }
  };

  const handleToggleSnake = () => {
    if (isSnakeMinimized) {
      setIsSnakeMinimized(false);
      setActiveWindow("snake");
    } else {
      setIsSnakeMinimized(true);
    }
  };

  const handleToggleFile = () => {
    if (isFileMinimized) {
      setIsFileMinimized(false);
      setActiveWindow("file");
    } else {
      setIsFileMinimized(true);
    }
  };

  const handleToggleResume = () => {
    if (isResumeMinimized) {
      setIsResumeMinimized(false);
      setActiveWindow("resume");
    } else {
      setIsResumeMinimized(true);
    }
  };

  const handleToggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  return (
    <div className="desktop-container">
      {/* for splash cursor */}
      {isSplashCursorActive && <SplashCursor />}
      {/* for noise on screen */}
      {isNoiseActive && (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Noise
            patternSize={250}
            patternScaleX={2}
            patternScaleY={2}
            patternRefreshInterval={2}
            patternAlpha={10}
          />
        </div>
      )}
      {/* Top Status */}
      <div className="status-indicator">
        <span className="dot"></span>
        <span className="status-text">Available for opportunities</span>
        <button
          className="ln-btn"
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/darshan-rami-b735a520a/",
              "_blank",
            )
          }
        >
          🔗 LinkdIn
        </button>
      </div>

      {/* Desktop Icons */}
      <div className="desktop-icons">
        <div className="desktop-icon" onClick={handleOpenTerminal}>
          <span className="desktop-icon-emoji" style={{ color: "#33ff33" }}>
            {emjoi}
          </span>
          <span className="icon-label">Terminal</span>
        </div>
        <div className="desktop-icon" onClick={handleOpenFile}>
          <span className="desktop-icon-emoji">🖥️</span>
          <span className="icon-label">This PC</span>
        </div>
        <div className="desktop-icon" onClick={handleOpenAbout}>
          <span className="desktop-icon-emoji">👤</span>
          <span className="icon-label">About</span>
        </div>
        <div className="desktop-icon" onClick={handleOpenSkills}>
          <span className="desktop-icon-emoji">👨‍💻</span>
          <span className="icon-label">Skills</span>
        </div>
        <div className="desktop-icon" onClick={handleOpenRadar}>
          <span className="desktop-icon-emoji">📊</span>
          <span className="icon-label">Radar</span>
        </div>
        <div className="desktop-icon" onClick={handleOpenLogs}>
          <span className="desktop-icon-emoji">📑</span>
          <span className="icon-label">Logs</span>
        </div>
        <div className="desktop-icon" onClick={handleOpenProjects}>
          <span className="desktop-icon-emoji">📁</span>
          <span className="icon-label">Projects</span>
        </div>
        <div className="desktop-icon" onClick={handleOpenTimeline}>
          <span className="desktop-icon-emoji">📅</span>
          <span className="icon-label">Timeline</span>
        </div>
        <div className="desktop-icon" onClick={handleOpenResume}>
          <span className="desktop-icon-emoji">📄</span>
          <span className="icon-label">Resume</span>
        </div>
        <div className="desktop-icon" onClick={handleOpenSetting}>
          <span className="desktop-icon-emoji">⚙️</span>
          <span className="icon-label">Settings</span>
        </div>
        <div className="desktop-icon" onClick={handleOpenCode}>
          <span className="desktop-icon-emoji">💻</span>
          <span className="icon-label">Code</span>
        </div>
        <div className="desktop-icon" onClick={handleOpenTictactoe}>
          <span className="desktop-icon-emoji">✖️</span>
          <span className="icon-label">TicTacToe</span>
        </div>
        <div className="desktop-icon" onClick={handleOpenSnake}>
          <span className="desktop-icon-emoji">🐍</span>
          <span className="icon-label">Snake</span>
        </div>
      </div>

      {/* Windows */}
      {isAboutOpen && !isAboutMinimized && (
        <About
          onClose={() => setIsAboutOpen(false)}
          onMinimize={() => setIsAboutMinimized(true)}
          zIndex={activeWindow === "about" ? 100 : 50}
          onFocus={() => setActiveWindow("about")}
          initialPos={windowPositions.about}
        />
      )}
      {isSkillsOpen && !isSkillsMinimized && (
        <Skills
          onClose={() => setIsSkillsOpen(false)}
          onMinimize={() => setIsSkillsMinimized(true)}
          zIndex={activeWindow === "skills" ? 100 : 50}
          onFocus={() => setActiveWindow("skills")}
          initialPos={windowPositions.skills}
        />
      )}
      {isRadarOpen && !isRadarMinimized && (
        <Radar
          onClose={() => setIsRadarOpen(false)}
          onMinimize={() => setIsRadarMinimized(true)}
          zIndex={activeWindow === "radar" ? 100 : 50}
          onFocus={() => setActiveWindow("radar")}
          initialPos={windowPositions.radar}
        />
      )}
      {isLogsOpen && !isLogsMinimized && (
        <Logs
          onClose={() => setIsLogsOpen(false)}
          onMinimize={() => setIsLogsMinimized(true)}
          zIndex={activeWindow === "logs" ? 100 : 50}
          onFocus={() => setActiveWindow("logs")}
          initialPos={windowPositions.logs}
        />
      )}
      {isProjectsOpen && !isProjectsMinimized && (
        <Projects
          onClose={() => setIsProjectsOpen(false)}
          onMinimize={() => setIsProjectsMinimized(true)}
          zIndex={activeWindow === "projects" ? 100 : 50}
          onFocus={() => setActiveWindow("projects")}
          initialPos={windowPositions.projects}
        />
      )}
      {isTimelineOpen && !isTimelineMinimized && (
        <Timeline
          onClose={() => setIsTimelineOpen(false)}
          onMinimize={() => setIsTimelineMinimized(true)}
          zIndex={activeWindow === "timeline" ? 100 : 50}
          onFocus={() => setActiveWindow("timeline")}
          initialPos={windowPositions.timeline}
        />
      )}
      {isTictactoeOpen && !isTictactoeMinimized && (
        <Tictactoe
          onClose={() => setIsTictactoeOpen(false)}
          onMinimize={() => setIsTictactoeMinimized(true)}
          zIndex={activeWindow === "tictactoe" ? 100 : 50}
          onFocus={() => setActiveWindow("tictactoe")}
          initialPos={windowPositions.tictactoe}
        />
      )}
      {isSettingOpen && !isSettingMinimized && (
        <Setting
          onClose={() => setIsSettingOpen(false)}
          onMinimize={() => setIsSettingMinimized(true)}
          zIndex={activeWindow === "setting" ? 100 : 50}
          onFocus={() => setActiveWindow("setting")}
          initialPos={windowPositions.setting}
          isSplashCursorActive={isSplashCursorActive}
          setIsSplashCursorActive={setIsSplashCursorActive}
          isNoiseActive={isNoiseActive}
          setIsNoiseActive={setIsNoiseActive}
          themeColor={themeColor}
          setThemeColor={setThemeColor}
          activeColor={activeColor}
          setActiveColor={setActiveColor}
          clockColor={clockColor}
          setClockColor={setClockColor}
        />
      )}
      {isTerminalOpen && !isTerminalMinimized && (
        <Terminal
          onClose={() => setIsTerminalOpen(false)}
          onMinimize={() => setIsTerminalMinimized(true)}
          zIndex={activeWindow === "terminal" ? 100 : 50}
          onFocus={() => setActiveWindow("terminal")}
          initialPos={windowPositions.terminal}
          onOpenModule={handleOpenModule}
        />
      )}
      {isCodeOpen && !isCodeMinimized && (
        <Code
          onClose={() => setIsCodeOpen(false)}
          onMinimize={() => setIsCodeMinimized(true)}
          zIndex={activeWindow === "code" ? 100 : 50}
          onFocus={() => setActiveWindow("code")}
          initialPos={windowPositions.code}
        />
      )}
      {isSnakeOpen && !isSnakeMinimized && (
        <Snake
          onClose={() => setIsSnakeOpen(false)}
          onMinimize={() => setIsSnakeMinimized(true)}
          zIndex={activeWindow === "snake" ? 100 : 50}
          onFocus={() => setActiveWindow("snake")}
          initialPos={windowPositions.snake}
        />
      )}
      {isFileOpen && !isFileMinimized && (
        <File
          onClose={() => setIsFileOpen(false)}
          onMinimize={() => setIsFileMinimized(true)}
          zIndex={activeWindow === "file" ? 100 : 50}
          onFocus={() => setActiveWindow("file")}
          initialPos={windowPositions.file}
          onOpenModule={handleOpenModule}
        />
      )}
      {isResumeOpen && !isResumeMinimized && (
        <Resume
          onClose={() => setIsResumeOpen(false)}
          onMinimize={() => setIsResumeMinimized(true)}
          zIndex={activeWindow === "resume" ? 100 : 50}
          onFocus={() => setActiveWindow("resume")}
          initialPos={windowPositions.resume}
        />
      )}

      {isClippyOpen && <Clip onClose={() => setIsClippyOpen(false)} />}

      {/* Taskbar */}
      <div className="taskbar">
        <div className="taskbar-left">
          <div className="start-menu-container" ref={startMenuRef}>
            {isStartMenuOpen && (
              <div className="start-menu">
                <div className="start-menu-sidebar">
                  <div className="sidebar-text">DR-OS v6.0</div>
                </div>
                <div className="start-menu-content">
                  <div
                    className="start-menu-item"
                    onClick={() => {
                      handleOpenFile();
                      setIsStartMenuOpen(false);
                    }}
                  >
                    <span className="menu-icon">🖥️</span>
                    <span>This PC</span>
                  </div>
                  <div
                    className="start-menu-item"
                    onClick={() => {
                      handleOpenAbout();
                      setIsStartMenuOpen(false);
                    }}
                  >
                    <span className="menu-icon">👤</span>
                    <span>About Me</span>
                  </div>
                  <div
                    className="start-menu-item"
                    onClick={() => {
                      handleOpenSkills();
                      setIsStartMenuOpen(false);
                    }}
                  >
                    <span className="menu-icon">👨‍💻</span>
                    <span>Skills</span>
                  </div>
                  <div
                    className="start-menu-item"
                    onClick={() => {
                      handleOpenRadar();
                      setIsStartMenuOpen(false);
                    }}
                  >
                    <span className="menu-icon">📊</span>
                    <span>Radar</span>
                  </div>
                  <div
                    className="start-menu-item"
                    onClick={() => {
                      handleOpenLogs();
                      setIsStartMenuOpen(false);
                    }}
                  >
                    <span className="menu-icon">📑</span>
                    <span>Experience Logs</span>
                  </div>
                  <div
                    className="start-menu-item"
                    onClick={() => {
                      handleOpenProjects();
                      setIsStartMenuOpen(false);
                    }}
                  >
                    <span className="menu-icon">📁</span>
                    <span>Projects</span>
                  </div>
                  <div
                    className="start-menu-item"
                    onClick={() => {
                      handleOpenTimeline();
                      setIsStartMenuOpen(false);
                    }}
                  >
                    <span className="menu-icon">📅</span>
                    <span>Career Timeline</span>
                  </div>
                  <div
                    className="start-menu-item"
                    onClick={() => {
                      handleOpenResume();
                      setIsStartMenuOpen(false);
                    }}
                  >
                    <span className="menu-icon">📄</span>
                    <span>Resume</span>
                  </div>
                  <div
                    className="start-menu-item"
                    onClick={() => {
                      handleOpenTerminal();
                      setIsStartMenuOpen(false);
                    }}
                  >
                    <span className="menu-icon">{emjoi}</span>
                    <span>Terminal</span>
                  </div>
                  <div
                    className="start-menu-item"
                    onClick={() => {
                      handleOpenCode();
                      setIsStartMenuOpen(false);
                    }}
                  >
                    <span className="menu-icon">💻</span>
                    <span>Code</span>
                  </div>
                  <div
                    className="start-menu-item"
                    onClick={() => {
                      handleOpenSnake();
                      setIsStartMenuOpen(false);
                    }}
                  >
                    <span className="menu-icon">🐍</span>
                    <span>Snake</span>
                  </div>
                  <div
                    className="start-menu-item"
                    onClick={() => {
                      handleOpenTictactoe();
                      setIsStartMenuOpen(false);
                    }}
                  >
                    <span className="menu-icon">✖️</span>
                    <span>Tic-Tac-Toe</span>
                  </div>
                  <div className="menu-divider"></div>
                  <div
                    className="start-menu-item"
                    onClick={() => {
                      handleOpenSetting();
                      setIsStartMenuOpen(false);
                    }}
                  >
                    <span className="menu-icon">⚙️</span>
                    <span>Settings</span>
                  </div>
                </div>
              </div>
            )}
            <button className="start-btn" onClick={handleToggleStartMenu}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              <span>START</span>
            </button>
          </div>

          {/* Taskbar Items */}
          {isAboutOpen && (
            <div
              className={`taskbar-item ${!isAboutMinimized ? "active" : ""}`}
              onClick={handleToggleAbout}
            >
              <span className="taskbar-icon-emoji">👤</span>
            </div>
          )}
          {isSkillsOpen && (
            <div
              className={`taskbar-item ${!isSkillsMinimized ? "active" : ""}`}
              onClick={handleToggleSkills}
            >
              <span className="taskbar-icon-emoji">👨‍💻</span>
            </div>
          )}
          {isRadarOpen && (
            <div
              className={`taskbar-item ${!isRadarMinimized ? "active" : ""}`}
              onClick={handleToggleRadar}
            >
              <span className="taskbar-icon-emoji">📊</span>
            </div>
          )}
          {isLogsOpen && (
            <div
              className={`taskbar-item ${!isLogsMinimized ? "active" : ""}`}
              onClick={handleToggleLogs}
            >
              <span className="taskbar-icon-emoji">📑</span>
            </div>
          )}
          {isProjectsOpen && (
            <div
              className={`taskbar-item ${!isProjectsMinimized ? "active" : ""}`}
              onClick={handleToggleProjects}
            >
              <span className="taskbar-icon-emoji">📁</span>
            </div>
          )}
          {isTimelineOpen && (
            <div
              className={`taskbar-item ${!isTimelineMinimized ? "active" : ""}`}
              onClick={handleToggleTimeline}
            >
              <span className="taskbar-icon-emoji">📅</span>
            </div>
          )}
          {isTictactoeOpen && (
            <div
              className={`taskbar-item ${!isTictactoeMinimized ? "active" : ""}`}
              onClick={handleToggleTictactoe}
            >
              <span className="taskbar-icon-emoji">✖️</span>
            </div>
          )}
          {isSettingOpen && (
            <div
              className={`taskbar-item ${!isSettingMinimized ? "active" : ""}`}
              onClick={handleToggleSetting}
            >
              <span className="taskbar-icon-emoji">⚙️</span>
            </div>
          )}
          {isTerminalOpen && (
            <div
              className={`taskbar-item ${!isTerminalMinimized ? "active" : ""}`}
              onClick={handleToggleTerminal}
            >
              <span className="taskbar-icon-emoji">{emjoi}</span>
            </div>
          )}
          {isCodeOpen && (
            <div
              className={`taskbar-item ${!isCodeMinimized ? "active" : ""}`}
              onClick={handleToggleCode}
            >
              <span className="taskbar-icon-emoji">💻</span>
            </div>
          )}
          {isSnakeOpen && (
            <div
              className={`taskbar-item ${!isSnakeMinimized ? "active" : ""}`}
              onClick={handleToggleSnake}
            >
              <span className="taskbar-icon-emoji">🐍</span>
            </div>
          )}
          {isFileOpen && (
            <div
              className={`taskbar-item ${!isFileMinimized ? "active" : ""}`}
              onClick={handleToggleFile}
            >
              <span className="taskbar-icon-emoji">🖥️</span>
            </div>
          )}
          {isResumeOpen && (
            <div
              className={`taskbar-item ${!isResumeMinimized ? "active" : ""}`}
              onClick={handleToggleResume}
            >
              <span className="taskbar-icon-emoji">📄</span>
            </div>
          )}
        </div>

        <div className="taskbar-right">
          <div
            className="tray-icon"
            onClick={() => setIsMuted(!isMuted)}
            style={{ cursor: "pointer", fontSize: "1.2rem" }}
          >
            {isMuted ? "🔇" : "🔊"}
          </div>

          <div className="user-info">
            <FaUser size={18} />
            <span className="username">#DR-OS</span>
          </div>

          <div className="clock-section">
            <div className="time">{formatTime(time)}</div>
            <div className="date">{formatDate(time)}</div>
          </div>
          <div className="bell-icon-div" onClick={() => setIsClippyOpen(true)}>
            <span className="bell-icon">🔔</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
