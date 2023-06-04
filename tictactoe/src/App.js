/**
 * Challenges:
 *  1. For the current move only, show “You are at move #…” instead of a button.
 *  2. Rewrite Board to use two loops to make the squares instead of hardcoding them.
 *  3. Add a toggle button that lets you sort the moves in either ascending or descending order.
 *  4. When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
 *  5. Display the location for each move in the format (row, col) in the move history list.
 *
 */

import { useState } from "react";

import "./App.css";

function Square({ value, onSquareClick }) {
  // When button is clicked

  // Returns a button
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  // Updates the board when square is clicked
  function handleClick(i) {
    const nextSquares = [...squares];

    if (squares[i] || calculateWinner(squares)) return; // return early if square already clicked
    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");
    onPlay(nextSquares);
  }

  // Displays status of game board
  //
  // Returns:
  //  status(str): the status of the game (winner or player turn)
  function displayStatus() {
    let status;
    const winner = calculateWinner(squares);
    winner
      ? (status = "Winner: " + winner)
      : (status = "Next Player: " + (xIsNext ? "X" : "O"));
    return status;
  }

  // Makes the game board consisting of the square component
  //
  // Returns:
  //  board (JSX): board consisting of Square
  //  TODO: Figure out how to make this more readable / maps / 
  function makeBoard(rowSize, colSize) {
    const boardArray = [];
    for (const rowIndex of Array(rowSize).keys()) {
      const row = [];
      for (const colIndex of Array(colSize).keys()) {
        const offset = rowIndex * colSize + colIndex;
        row.push(
          <Square
            key={offset}
            value={squares[offset]}
            onSquareClick={() => handleClick(offset)}
          />
        );
      }
      boardArray.push(
        <div key={rowIndex} className="board-row">
          {row}
        </div>
      );
    }
    return boardArray;
  }

  return (
    <>
      <div className="status">{displayStatus()}</div>
      {makeBoard(3, 3)}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = !(currentMove % 2);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setHistory(history.slice(0, nextMove + 1));
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    move > 0
      ? (description = "Go to move #" + move)
      : (description = "Go to game start");

    return (
      <li key={move}>
        {/* Challenge 1 */}
        {!(move === currentMove) ? (
          <button onClick={() => jumpTo(move)}>{description}</button>
        ) : (
          <p>You are at move #{currentMove}</p>
        )}
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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
