"use client";

import MyImage from "./Image";
import MyButton from "./Button";
import ListProducts from "./ListProducts";
import { useState } from "react";

// Define an object to represent user values.
const user = {
  name: "John Doe",
  imageUrl: "next.svg",
  imageSize: 500,
  loggedIn: false,
};

// Define function to render the home page.
export default function Home() {
  // Button counter logic
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    // Create div container with flexbox layout, centered items, and minimum height of the screen.
    <div className="flex flex-col items-center min-h-screen py-2">
      <h1>Welcome to my app, {user.name}!</h1>

      {/* Render MyImage component if user is logged in, otherwise render MyButton component. */}
      {user.loggedIn ? (
        <MyImage
          src={user.imageUrl}
          alt="Avatar"
          width={user.imageSize}
          height={user.imageSize}
        />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <MyButton count={count} onClick={handleClick} />
          <MyButton count={count} onClick={handleClick} />
        </div>
      )}

      {/* Render ListProducts component if user is logged in. */}
      {user.loggedIn && <ListProducts />}
    </div>
  );
}
