import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react"; // Import React

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element with ID 'root' not found.");
}
