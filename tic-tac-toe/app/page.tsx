"use client";

import Board from "./components/board";
import { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState<("X" | "O" | null)[][]>([
    Array(9).fill(null),
  ]);

  // Even move number means X's turn, odd means O's turn
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;

  // Currently viewed step in history
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: ("X" | "O" | null)[]) {
    // Get rid of any "future" history if we are not at the latest move
    // NextSquares is the new state of the board after a move has been made
    const newHistory = [...history.slice(0, currentMove + 1), nextSquares];

    // Add the new state of squares to the history
    setHistory(newHistory);

    // Set current move to latest move (the last index of the new history array)
    setCurrentMove(newHistory.length - 1);
  }

  function jumpTo(step: number) {
    setCurrentMove(step);
  }

  const moves = history.map((squares, move) => {
    let description;

    // If after 1st move, display the move number, otherwise display "Go to game start"
    if (move > 0) {
      description = `Go to move #${move}`;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        <button
          className="btn border border-gray-300 rounded-md p-2 m-1 hover:bg-gray-200 transition-colors duration-200"
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
