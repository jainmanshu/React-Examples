import React, { useState, useEffect } from "react";

const numRows = 10;
const numCols = 10;
const numMines = 10;

const Cell = ({ row, col, isMine, isRevealed, onClick }) => {
  const handleClick = () => {
    onClick(row, col);
  };

  return (
    <div
      className={`cell ${isRevealed ? "revealed" : ""}`}
      onClick={handleClick}
    >
      {isRevealed && (isMine ? "💣" : "✅")}
    </div>
  );
};

const Board = ({ board, handleCellClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            row={rowIndex}
            col={colIndex}
            isMine={cell.isMine}
            isRevealed={cell.isRevealed}
            onClick={handleCellClick}
          />
        ))
      )}
    </div>
  );
};

const Game = () => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    generateBoard();
  }, []);

  const generateBoard = () => {
    const newBoard = [];
    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < numCols; j++) {
        row.push({ isMine: false, isRevealed: false });
      }
      newBoard.push(row);
    }
    // Place mines randomly
    for (let i = 0; i < numMines; i++) {
      let row = Math.floor(Math.random() * numRows);
      let col = Math.floor(Math.random() * numCols);
      while (newBoard[row][col].isMine) {
        row = Math.floor(Math.random() * numRows);
        col = Math.floor(Math.random() * numCols);
      }
      newBoard[row][col].isMine = true;
    }
    setBoard(newBoard);
  };

  const handleCellClick = (row, col) => {
    const newBoard = [...board];
    newBoard[row][col].isRevealed = true;
    setBoard(newBoard);
  };

  return (
    <div className="game">
      <h1>Minesweeper</h1>
      <Board board={board} handleCellClick={handleCellClick} />
    </div>
  );
};

export default Game;
