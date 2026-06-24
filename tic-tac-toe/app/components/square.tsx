"use client";

export default function Square({
  value,
  onSquareClick,
}: {
  value?: "X" | "O" | null;
  onSquareClick: () => void;
}) {
  return (
    <button
      className="square font-bold text-4xl border border-gray-300 rounded-md w-20 h-20 flex items-center justify-center"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
