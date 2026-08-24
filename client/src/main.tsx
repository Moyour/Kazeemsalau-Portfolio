import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
