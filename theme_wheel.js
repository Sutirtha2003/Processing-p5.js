// Import the necessary libraries
import React, { useState } from "react";
import ReactDOM from "react-dom";

// Create the component
function ReadersThemeWheel() {
  // Create the state variables
  const [themes, setThemes] = useState(["Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller"]);

  // Create the function to generate the theme wheel
  const generateThemeWheel = () => {
    const wheel = document.createElement("div");
    wheel.className = "theme-wheel";

    for (const theme of themes) {
      const slice = document.createElement("div");
      slice.className = "theme-slice";
      slice.innerHTML = theme;
      wheel.appendChild(slice);
    }

    return wheel;
  };

  // Render the component
  return (
    <div>
      <h1>Readers Theme Wheel</h1>
      <div id="theme-wheel">{generateThemeWheel()}</div>
    </div>
  );
}

// Render the component to the DOM
const rootElement = document.getElementById("root");
ReactDOM.render(<ReadersThemeWheel />, rootElement);
