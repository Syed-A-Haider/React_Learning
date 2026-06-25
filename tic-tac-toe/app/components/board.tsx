import Square from "./square";

export default function Board({
  xIsNext,
  squares,
  onPlay,
}: {
  xIsNext: boolean;
  squares: ("X" | "O" | null)[];
  onPlay: (nextSquares: ("X" | "O" | null)[]) => void;
}) {
  const winnerInfo = calculateWinner(squares);
  const winnerSquares = winnerInfo ? winnerInfo[0] : null;
  const winner = winnerInfo ? winnerInfo[1] : null;

  console.log("Winner squares:", winnerSquares);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  const handleClick = (index: number) => {
    // Ensure square is not filled or game is not already won before allowing a move
    if (squares[index] || calculateWinner(squares)) {
      return;
    }

    // Get a copy of the current squares state
    const newSquares = squares.slice();

    // Set the clicked square to the current player's symbol (X or O)
    newSquares[index] = xIsNext ? "X" : "O";

    // Update state - re-render squares
    onPlay(newSquares);
  };

  // Use arrow functions to pass index to prevent immediate run of handleClick
  return (
    <>
      <div className="status flex justify-center text-2xl font-bold">
        {status}
      </div>
      {
        /* <div className="board border border-gray-300 rounded-md p-4 flex flex-col items-center">
        <div className="board-row flex">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row flex">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row flex">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div> */

        <div className="board border border-gray-300 rounded-md p-4 flex flex-col items-center">
          {/* Iterate through rows 0, 1, 2 */}
          {[0, 1, 2].map((row) => (
            <div key={row} className="board-row flex">
              {/* Iterate through columns, assign square index, and render Square component */}
              {[0, 1, 2].map((col) => {
                const index = row * 3 + col;
                return (
                  <Square
                    key={index}
                    value={squares[index]}
                    onSquareClick={() => handleClick(index)}
                    winning={winnerSquares?.includes(index) ? true : false}
                  />
                );
              })}
            </div>
          ))}
        </div>
      }
    </>
  );
}

// Function can either return an array of winning square indices and winner or null
function calculateWinner(
  squares: ("X" | "O" | null)[],
): [number[], "X" | "O" | null] | null {
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

  // Loop through every 3-square line to check if any player has won
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    // If the squares at the three indices are the same and not null, return the winner
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [[a, b, c], squares[a]];
    }
  }
  return null;
}
