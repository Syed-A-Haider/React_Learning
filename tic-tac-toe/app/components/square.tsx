"use client";

import clsx from "clsx";

export default function Square({
  value,
  onSquareClick,
  winning,
}: {
  value?: "X" | "O" | null;
  onSquareClick: () => void;
  winning: boolean;
}) {
  console.log("Square winning prop:", winning);
  return (
    <button
      className={clsx(
        "font-bold text-4xl border border-gray-300 rounded-md w-20 h-20 flex items-center justify-center",
        winning ? "bg-green-500 text-white" : "bg-gray-100 text-black",
      )}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
