import { useState } from "react";

type CellProp = {
  value: string | null;
  onClick: Function;
};

function Cell({ value, onClick }: CellProp) {
  return (
    <div className="cell" onClick={() => onClick()}>
      {value}
    </div>
  );
}

interface BoardProps {
  rows?: number;
  cols?: number;
}

type Player = "X" | "O" | null;
type BoardType = Player[][];

function Board({ rows = 3, cols = 3 }: BoardProps) {
  const [board, setBoard] = useState<BoardType>(
    new Array(rows).fill(null).map(() => new Array(cols).fill(null))
  );

  const [currentPlayer, setCurrentPlayer] = useState<Player>("O");
  const [winner, setWinner] = useState<Player | "Draw">(null);

  const handleClick = (row: number, col: number) => {
    if (board[row][col] != null) return;

    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? currentPlayer : cell
      )
    );
    setBoard(newBoard);
    if (checkWinner(newBoard, row, col, currentPlayer)) {
      setWinner(currentPlayer);
    } else if (checkDraw(newBoard)) {
      setWinner("Draw");
    } else {
      setCurrentPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
    }
  };

  const checkDraw = (board: BoardType): boolean => {
    return board.every((row) => row.every((cell) => cell !== null));
  };

  const checkWinner = (
    board: BoardType,
    row: number,
    col: number,
    player: Player
  ): boolean => {
    if (player === null) return false;

    // Check row
    if (board[row].every((cell) => cell === player)) {
      return true;
    }

    // Check column
    if (board.every((r) => r[col] === player)) {
      return true;
    }

    // Check main diagonal
    if (row === col && board.every((r, i) => r[i] === player)) {
      return true;
    }

    // Check anti-diagonal
    if (
      row + col === board.length - 1 &&
      board.every((r, i) => r[board.length - 1 - i] === player)
    ) {
      return true;
    }

    return false;
  };

  const handleReset = () => {
    setBoard(new Array(rows).fill(null).map(() => new Array(cols).fill(null)));
    setCurrentPlayer("O");
    setWinner(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div className="button">
        <button onClick={handleReset}>Reset</button>
        <div style={{ padding: 10 }}> Current Player Turn: {currentPlayer}</div>
      </div>
      <div
        className="board"
        style={{
          gridTemplateColumns: `repeat(${cols}, 40px)`,
          gridTemplateRows: `repeat(${rows}, 40px)`,
        }}
      >
        {board.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((_, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleClick(rowIndex, colIndex)}
                value={board[rowIndex][colIndex]}
              />
            ))}
          </div>
        ))}
      </div>
      {winner && (
        <div className="button">
          {winner === "Draw" ? "It's a draw!" : `Winner is: ${winner}`}
        </div>
      )}
    </div>
  );
}

export default Board;
