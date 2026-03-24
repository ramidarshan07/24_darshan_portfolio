import React, { useState, useEffect } from "react";
import "./components.css";

const Clip = ({ onClose }) => {
  const tips = [
    "It looks like you're hiring a developer! 👀\nMay I suggest Darshan?",
    "Fun fact: This entire portfolio is a retro OS simulation! 💾",
    "Looking for a full-stack dev with AI skills?\nYou're in the right place! 🎯",
    "Did you check out the Snake game?\nPress START → Games → Snake! 🎮",
    "This portfolio runs on React.\nJust like Darshan's real projects!",
    "Psst... there's also a TicTacToe game hidden in here! ✖️⭕",
    "TIP: Type 'coffee' in the terminal for fun",
  ];

  const [currentTipIndex, setCurrentTipIndex] = useState(
    Math.floor(Math.random() * tips.length),
  );

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % tips.length);
  };

  useEffect(() => {
    const timer = setInterval(nextTip, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="clippy-container">
      <div className="clippy-window">
        <div className="clippy-titlebar">
          <div className="clippy-title">📎 CLIPPY.txt</div>
          <div className="clippy-controls">
            <span className="control-btn" onClick={onClose}>
              X
            </span>
          </div>
        </div>

        <div className="clippy-content">
          <div className="clippy-avatar">📎</div>
          <div className="clippy-message">
            {tips[currentTipIndex].split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </div>

        <div className="clippy-actions">
          <button className="clippy-next-btn" onClick={nextTip}>
            Next Tip
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clip;
