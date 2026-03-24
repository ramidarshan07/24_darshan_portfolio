import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "./components.css";

const Terminal = ({
  onClose,
  onMinimize,
  zIndex,
  onFocus,
  initialPos,
  onOpenModule,
}) => {
  const [size, setSize] = useState({ width: 700, height: 500 });
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const nodeRef = useRef(null);
  const hasRun = useRef(false);

  const welcomeMessage = `
  _____            _____   _____ _    _          _   _ 
 |  __ \\   /\\     |  __ \\ / ____| |  | |   /\\   | \\ | |
 | |  | | /  \\    | |__) | (___ | |__| |  /  \\  |  \| |
 | |  | |/ /\\ \\   |  _  / \\___ \\|  __  | / /\\ \\ | . \` |
 | |__| / ____ \\  | | \\ \\ ____) | |  | |/ ____ \\| |\\  |
 |_____/_/    \\_\\ |_|  \\_\\_____/|_|  |_/_/    \\_\\_| \\_|
  `;

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const initTerminal = async () => {
      // 1. Show ASCII Art
      setHistory([
        {
          type: "output",
          content: welcomeMessage,
          isAscii: true,
          isInitial: true,
          color: "var(--terminal-green)",
        },
      ]);
      await sleep(500);

      // 2. Initial Info
      const infoLines = [
        {
          text: "Welcome to DR-OS [Version 6.0.2024]",
          color: "var(--soft-pastel-green)",
        },
        {
          text: "(c) Darshan Rami Corp. All rights reserved.",
          color: "var(--soft-pastel-green)",
        },
        { text: " ", color: "var(--soft-pastel-green)" },
        {
          text: "System Status: ONLINE",
          color: "var(--terminal-green)",
          isStatus: true,
        },
        { text: "Memory: 640KB OK", color: "var(--soft-pastel-green)" },
        {
          text: "Role: Full Stack Developer @ Iflora Info Pvt. Ltd.",
          color: "var(--soft-pastel-green)",
        },
        {
          text: "Location: Ahmedabad, India",
          color: "var(--soft-pastel-green)",
        },
        { text: " ", color: "var(--soft-pastel-green)" },
      ];

      for (const line of infoLines) {
        setHistory((prev) => [
          ...prev,
          {
            type: "output",
            content: line.text,
            color: line.color,
            isInitial: true,
            isStatus: line.isStatus,
          },
        ]);
        await sleep(50);
      }

      // 3. Type init script
      const scriptCmd = "sh ./init_portfolio.sh";
      setHistory((prev) => [
        ...prev,
        { type: "prompt", content: "", isInitial: true },
      ]);

      for (let i = 0; i <= scriptCmd.length; i++) {
        setHistory((prev) => {
          const newHist = [...prev];
          newHist[newHist.length - 1].content = scriptCmd.substring(0, i);
          return newHist;
        });
        await sleep(100);
      }

      await sleep(500);
      setHistory((prev) => [
        ...prev,
        {
          type: "output",
          content: "Portfolio initialized successfully! ✓",
          color: "var(--terminal-green)",
          isInitial: true,
        },
      ]);
      await sleep(300);

      // 4. Final welcome
      setHistory((prev) => [
        ...prev,
        {
          type: "output",
          content: "Type 'help' for commands. Try hidden commands!",
          color: "var(--soft-pastel-green)",
          isInitial: true,
          isHelpLine: true,
        },
      ]);

      setIsTyping(false);
    };

    initTerminal();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (!isTyping && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTyping]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: "prompt", content: cmd }];

    if (trimmedCmd === "cls" || trimmedCmd === "clear") {
      setHistory((prev) => prev.filter((h) => h.isInitial));
      setInput("");
      return;
    }

    if (trimmedCmd === "help") {
      newHistory.push({
        type: "output",
        content: "Available commands:",
        color: "var(--terminal-green)",
      });
      const commands = [
        { c: "help", d: "Display this help message" },
        { c: "ls", d: "List all available modules on desktop" },
        { c: "cls", d: "Clear terminal screen" },
        { c: "cd <name>", d: "Open a specific module (e.g., cd about)" },
        { c: "whoami", d: "About Darshan Rami" },
        { c: "contact", d: "Contact details" },
        { c: "exit", d: "Close Terminal" },
      ];
      commands.forEach((c) => {
        newHistory.push({
          type: "output",
          content: `  ${c.c.padEnd(10)} - ${c.d}`,
          color: "var(--soft-pastel-green)",
        });
      });

      newHistory.push({ type: "output", content: " " });
      newHistory.push({
        type: "output",
        content: "Fun Commands:",
        color: "var(--terminal-green)",
      });
      const funCommands = [
        { c: "cowsay", d: "🐮 Moo!" },
        { c: "fortune", d: "🔮 Random fortune" },
        { c: "coffee", d: "☕ Brew some coffee" },
        { c: "cat", d: "🐱 A friendly cat" },
      ];
      funCommands.forEach((c) => {
        newHistory.push({
          type: "output",
          content: `  ${c.c.padEnd(10)} - ${c.d}`,
          color: "var(--soft-pastel-green)",
        });
      });
    } else if (trimmedCmd === "ls") {
      newHistory.push({
        type: "output",
        content: "Desktop Modules:",
        color: "var(--terminal-green)",
      });
      const modules = [
        "about",
        "skills",
        "radar",
        "logs",
        "projects",
        "timeline",
        "tictactoe",
        "setting",
        "playground",
        "snake",
        "file",
        "resume",
      ];
      newHistory.push({
        type: "output",
        content: modules.join("   "),
        color: "var(--soft-pastel-green)",
      });
    } else if (trimmedCmd.startsWith("cd ")) {
      const target = trimmedCmd.substring(3).trim();
      const modules = [
        "about",
        "skills",
        "radar",
        "logs",
        "projects",
        "timeline",
        "tictactoe",
        "setting",
        "playground",
        "snake",
        "file",
        "resume",
      ];
      if (modules.includes(target)) {
        newHistory.push({
          type: "output",
          content: `Opening ${target} module...`,
          color: "var(--soft-pastel-green)",
        });
        onOpenModule(target);
      } else {
        newHistory.push({
          type: "output",
          content: `bash: cd: ${target}: No such module`,
          color: "#fd6766",
        });
      }
    } else if (trimmedCmd === "contact") {
      newHistory.push({
        type: "output",
        content: "📧 darshanrami.152@gmail.com",
      });
      newHistory.push({ type: "output", content: "📱 9925419677" });
      newHistory.push({ type: "output", content: "📍 Ahmedabad, India" });
      newHistory.push({
        type: "output",
        content: "🔗 linkedin.com/in/darshan-rami-b735a520a/",
      });
    } else if (trimmedCmd === "whoami") {
      newHistory.push({
        type: "output",
        content: "Darshan Rami — Full Stack Developer II @ Ahmadabad, India",
      });
      newHistory.push({
        type: "output",
        content: "1.5+ years of full-stack dev",
      });
      newHistory.push({ type: "output", content: "Currently Working at IIPL" });
    } else if (trimmedCmd === "exit") {
      onClose();
      return;
    } else if (trimmedCmd === "cowsay") {
      const cow = `
____________________
< Moo! Hire Darshan! >
--------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
      `;
      newHistory.push({ type: "output", content: cow, isAscii: true });
    } else if (trimmedCmd === "fortune") {
      newHistory.push({
        type: "output",
        content: "═══ FORTUNE COOKIE ═══",
        color: "var(--terminal-green)",
      });
      newHistory.push({
        type: "output",
        content:
          "🔮 Your next 10x engineer is browsing this portfolio right now.",
      });
    } else if (trimmedCmd === "coffee") {
      const coffee = `
    (  (
     )  )
    ........
    |      |]
    \\      /
     \`----'
      `;
      newHistory.push({ type: "output", content: coffee, isAscii: true });
      newHistory.push({
        type: "output",
        content: "☕ Coffee.exe loaded!",
        color: "var(--terminal-green)",
      });
      newHistory.push({
        type: "output",
        content: "Darshan runs on coffee & clean code.",
      });
      newHistory.push({
        type: "output",
        content: "Current caffeine level: ████████░░ 80%",
      });
    } else if (trimmedCmd === "cat") {
      const cat = `
 /\\_/\\
( o.o )
 > ^ <
 /| |\\
(_| |_)
      `;
      newHistory.push({ type: "output", content: cat, isAscii: true });
      newHistory.push({
        type: "output",
        content: "🐱 Meow! This cat approves of Darshan's code.",
        color: "var(--terminal-green)",
      });
      newHistory.push({
        type: "output",
        content: "Fun fact: No cats were harmed in making this portfolio.",
        color: "var(--terminal-green)",
        isHelpMessage: true,
      });
    } else if (trimmedCmd === "") {
      // Just a new prompt
    } else {
      newHistory.push({
        type: "output",
        content: `bash: ${trimmedCmd}: command not found`,
        color: "#fd6766",
      });
      newHistory.push({
        type: "output",
        content: "Type 'help' for available commands.",
        color: "var(--soft-pastel-green)",
        isHelpMessage: true,
      });
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
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
          <div className="window-title">TERMINAL_V1.0.EXE</div>
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
          maxConstraints={[1200, 800]}
          onResize={(e, data) => {
            setSize({ width: data.size.width, height: data.size.height + 35 });
          }}
          resizeHandles={["se"]}
        >
          <div
            className="window-content terminal-content"
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
          >
            <div className="terminal-history">
              {history.map((line, i) => (
                <div
                  key={i}
                  className={`terminal-line ${line.type} ${
                    line.isHelpLine ? "help-line" : ""
                  } ${line.isHelpMessage ? "help-message" : ""}`}
                  style={{ color: line.color || "var(--soft-pastel-green)" }}
                >
                  {line.type === "prompt" && (
                    <span className="terminal-prompt">root@darshan:~$ </span>
                  )}
                  {line.isAscii ? (
                    <pre className="ascii-art">{line.content}</pre>
                  ) : line.isStatus ? (
                    <span>
                      System Status:{" "}
                      <span className="status-online">ONLINE</span>
                    </span>
                  ) : (
                    <span>{line.content}</span>
                  )}
                </div>
              ))}
              {!isTyping && (
                <div className="terminal-input-line">
                  <span className="terminal-prompt">root@darshan:~$ </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="terminal-input"
                    autoFocus
                  />
                </div>
              )}
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default Terminal;
