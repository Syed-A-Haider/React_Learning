"use client";

import Image from "next/image";
import { sculptureList } from "./image-data";
import { useState } from "react";

export default function ImageCarousel() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const hasNext = index < sculptureList.length - 1;

  function handleNextClick() {
    setIndex(hasNext ? index + 1 : 0);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  const sculpture = sculptureList[index];
  return (
    <div className="max-w-sm mx-auto mt-8 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-64">
        <Image
          src={sculpture.url}
          fill
          alt={sculpture.alt}
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <h2 className="text-xl font-bold text-gray-800">{sculpture.name}</h2>
        <p className="text-sm text-gray-500">by {sculpture.artist}</p>

        <p className="text-xs text-gray-400 uppercase tracking-wide">
          ({index + 1} of {sculptureList.length})
        </p>

        {/* Description */}
        {showMore && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {sculpture.description}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-2 pt-1">
          <button
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-150 "
            onClick={handleNextClick}
          >
            Next
          </button>
          <button
            className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-150 "
            onClick={handleMoreClick}
          >
            {showMore ? "Hide" : "Show"} More Details
          </button>
        </div>
      </div>
    </div>
  );
}
