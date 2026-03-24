import React, { useState, useEffect, useCallback, useRef } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "./components.css";

const Tictactoe = ({ onClose, onMinimize, zIndex, onFocus, initialPos }) => {
  const [size, setSize] = useState({ width: 500, height: 600 });
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [difficulty, setDifficulty] = useState("easy"); // "easy" or "hard"
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [scores, setScores] = useState({ player: 0, dros: 0, draws: 0 });
  const nodeRef = useRef(null);

  const WIN_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  const checkWinner = useCallback((currentBoard) => {
    for (let combo of WIN_COMBINATIONS) {
      const [a, b, c] = combo;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return { winner: currentBoard[a], line: combo };
      }
    }
    if (currentBoard.every((square) => square !== null)) {
      return { winner: "draw", line: null };
    }
    return null;
  }, []);

  // Minimax Algorithm for "Hard" mode
  const minimax = useCallback(
    (tempBoard, depth, isMaximizing) => {
      const result = checkWinner(tempBoard);
      if (result) {
        if (result.winner === "O") return 10 - depth;
        if (result.winner === "X") return depth - 10;
        return 0;
      }

      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
          if (tempBoard[i] === null) {
            tempBoard[i] = "O";
            let score = minimax(tempBoard, depth + 1, false);
            tempBoard[i] = null;
            bestScore = Math.max(score, bestScore);
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
          if (tempBoard[i] === null) {
            tempBoard[i] = "X";
            let score = minimax(tempBoard, depth + 1, true);
            tempBoard[i] = null;
            bestScore = Math.min(score, bestScore);
          }
        }
        return bestScore;
      }
    },
    [checkWinner],
  );

  const getComputerMove = useCallback(() => {
    const availableMoves = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);

    if (difficulty === "easy") {
      // Random move
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    } else {
      // Minimax (Hard/Impossible mode)
      let bestScore = -Infinity;
      let move;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = "O";
          let score = minimax(board, 0, false);
          board[i] = null;
          if (score > bestScore) {
            bestScore = score;
            move = i;
          }
        }
      }
      return move;
    }
  }, [board, difficulty, minimax]);

  const handleSquareClick = (index) => {
    if (board[index] || winner || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsXNext(false);

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      handleGameOver(gameResult);
    }
  };

  const handleGameOver = (result) => {
    setWinner(result.winner);
    setWinningLine(result.line);

    setScores((prev) => ({
      ...prev,
      player: result.winner === "X" ? prev.player + 1 : prev.player,
      dros: result.winner === "O" ? prev.dros + 1 : prev.dros,
      draws: result.winner === "draw" ? prev.draws + 1 : prev.draws,
    }));
  };

  useEffect(() => {
    if (!isXNext && !winner && isGameStarted) {
      const timer = setTimeout(() => {
        const move = getComputerMove();
        if (move !== undefined) {
          const newBoard = [...board];
          newBoard[move] = "O";
          setBoard(newBoard);
          setIsXNext(true);

          const gameResult = checkWinner(newBoard);
          if (gameResult) {
            handleGameOver(gameResult);
          }
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isXNext, winner, board, isGameStarted, getComputerMove, checkWinner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
  };

  const startGame = () => {
    setIsGameStarted(true);
    resetGame();
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
        className="component-window tictactoe-window"
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
          <div className="window-title">TICTACTOE.exe - DR-OS Games</div>
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
          maxConstraints={[800, 800]}
          onResize={(e, data) => {
            setSize({ width: data.size.width, height: data.size.height + 35 });
          }}
          resizeHandles={["se"]}
        >
          <div
            className="window-content"
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            {!isGameStarted ? (
              <div className="game-setup">
                <div className="game-logo">
                  <div className="logo-x">X</div>
                  <div className="logo-o">O</div>
                </div>
                <h2>NEON TIC-TAC-TOE</h2>
                <div className="difficulty-selector">
                  <p>SELECT DIFFICULTY:</p>
                  <div className="diff-buttons">
                    <button
                      className={`diff-btn ${difficulty === "easy" ? "active" : ""}`}
                      onClick={() => setDifficulty("easy")}
                    >
                      EASY
                    </button>
                    <button
                      className={`diff-btn ${difficulty === "hard" ? "active" : ""}`}
                      onClick={() => setDifficulty("hard")}
                    >
                      HARD
                    </button>
                  </div>
                </div>
                <button className="start-game-btn" onClick={startGame}>
                  START GAME
                </button>
              </div>
            ) : (
              <div className="game-board-container">
                <div className="game-info-bar">
                  <div className="score-card">
                    <div className="score-label">PLAYER (X)</div>
                    <div className="score-value">{scores.player}</div>
                  </div>
                  <div className="score-card">
                    <div className="score-label">DRAWS</div>
                    <div className="score-value">{scores.draws}</div>
                  </div>
                  <div className="score-card">
                    <div className="score-label">DR-OS (O)</div>
                    <div className="score-value">{scores.dros}</div>
                  </div>
                </div>

                <div className="status-msg">
                  {winner
                    ? winner === "draw"
                      ? "DRAW"
                      : `${winner === "X" ? "PLAYER" : "DR-OS"} VICTORIOUS`
                    : isXNext
                      ? "PLAYER'S TURN"
                      : "DR-OS ANALYZING..."}
                </div>

                <div className="ttt-grid">
                  {board.map((square, i) => (
                    <div
                      key={i}
                      className={`ttt-square ${square ? "occupied" : ""} ${winningLine?.includes(i) ? "winner-square" : ""}`}
                      onClick={() => handleSquareClick(i)}
                    >
                      {square && (
                        <span className={`symbol ${square.toLowerCase()}`}>
                          {square}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="game-controls-bottom">
                  <button className="reset-btn" onClick={resetGame}>
                    REBOOT MATCH
                  </button>
                  <button
                    className="setup-btn"
                    onClick={() => setIsGameStarted(false)}
                  >
                    EXIT TO MENU
                  </button>
                </div>
              </div>
            )}

            <div className="terminal-footer">
              <span className="footer-status">
                MODE: {difficulty.toUpperCase()}
              </span>
              <span className="footer-status">SYSTEM: DR-OS v6.0</span>
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default Tictactoe;
