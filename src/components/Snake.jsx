import React, { useState, useEffect, useRef, useCallback } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "./components.css";

const Snake = ({ onClose, onMinimize, zIndex, onFocus, initialPos }) => {
  const [size, setSize] = useState({ width: 600, height: 500 });
  const nodeRef = useRef(null);

  const GRID_SIZE = 20;
  const INITIAL_SNAKE = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
  ];
  const INITIAL_FOOD = { x: 5, y: 5 };
  const INITIAL_DIRECTION = { x: 0, y: -1 };

  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameState, setGameState] = useState("start"); // start, playing, gameOver
  const [score, setScore] = useState(0);

  const moveSnake = useCallback(() => {
    if (gameState !== "playing") return;

    setSnake((prevSnake) => {
      const head = {
        x: prevSnake[0].x + direction.x,
        y: prevSnake[0].y + direction.y,
      };

      // Border collision (relative to board size)
      // We'll use a fixed board size for logic to keep it simple,
      // but we'll scale the visual board.
      const boardWidth = 20; // 20 grid units
      const boardHeight = 15; // 15 grid units

      if (
        head.x < 0 ||
        head.x >= boardWidth ||
        head.y < 0 ||
        head.y >= boardHeight
      ) {
        setGameState("gameOver");
        return prevSnake;
      }

      // Self collision
      if (
        prevSnake.some(
          (segment) => segment.x === head.x && segment.y === head.y,
        )
      ) {
        setGameState("gameOver");
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((s) => s + 10);
        generateFood(newSnake);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameState]);

  const generateFood = (currentSnake) => {
    const maxX = 20;
    const maxY = 15;
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY),
      };
      // eslint-disable-next-line no-loop-func
      if (!currentSnake.some((s) => s.x === newFood.x && s.y === newFood.y))
        break;
    }
    setFood(newFood);
  };

  useEffect(() => {
    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
  }, [moveSnake]);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (gameState !== "playing") return;

      const key = e.key.toLowerCase();
      if ((key === "arrowup" || key === "w") && direction.y !== 1)
        setDirection({ x: 0, y: -1 });
      if ((key === "arrowdown" || key === "s") && direction.y !== -1)
        setDirection({ x: 0, y: 1 });
      if ((key === "arrowleft" || key === "a") && direction.x !== 1)
        setDirection({ x: -1, y: 0 });
      if ((key === "arrowright" || key === "d") && direction.x !== -1)
        setDirection({ x: 1, y: 0 });
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [direction, gameState]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameState("playing");
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
          <div className="window-title">SNAKE.exe - DR-OS Games</div>
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
          minConstraints={[400, 350]}
          maxConstraints={[1000, 800]}
          onResize={(e, data) => {
            setSize({ width: data.size.width, height: data.size.height + 35 });
          }}
          resizeHandles={["se"]}
        >
          <div className="window-content" style={{ padding: 0 }}>
            <div className="snake-container">
              <div className="snake-header">
                <span>SCORE: {score}</span>
                <span>LEN: {snake.length}</span>
              </div>

              <div className="snake-board-case">
                <div
                  className="snake-board"
                  style={{
                    width: 20 * GRID_SIZE,
                    height: 15 * GRID_SIZE,
                  }}
                >
                  {snake.map((segment, i) => (
                    <div
                      key={i}
                      className="snake-segment"
                      style={{
                        left: segment.x * GRID_SIZE,
                        top: segment.y * GRID_SIZE,
                        width: GRID_SIZE - 2,
                        height: GRID_SIZE - 2,
                        opacity: 1 - (i / snake.length) * 0.5,
                      }}
                    />
                  ))}
                  <div
                    className="snake-food"
                    style={{
                      left: food.x * GRID_SIZE,
                      top: food.y * GRID_SIZE,
                      width: GRID_SIZE - 2,
                      height: GRID_SIZE - 2,
                    }}
                  />
                </div>

                {gameState === "start" && (
                  <div className="snake-overlay">
                    <div className="snake-menu-title">
                      <div className="title-decoration" />
                      <div className="snake-version">SNAKE v1.0</div>
                      <div className="title-decoration" />
                    </div>
                    <div className="snake-hint">Arrow keys or WASD to move</div>
                    <button
                      className="snake-start-btn"
                      onClick={() => setGameState("playing")}
                    >
                      [ START GAME ]
                    </button>
                  </div>
                )}

                {gameState === "gameOver" && (
                  <div className="snake-overlay">
                    <div className="snake-gameover-text">GAME OVER</div>
                    <div className="snake-final-score">Score: {score}</div>
                    <button className="snake-start-btn" onClick={resetGame}>
                      [ RETRY ]
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default Snake;
