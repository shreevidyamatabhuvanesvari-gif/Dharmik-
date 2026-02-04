/**
 * index.js
 *
 * Web application entry point.
 * Mounts the root React component into index.html.
 */

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

/**
 * Why:
 * createRoot enables React 18 concurrent features
 * and is the recommended, future-proof API.
 */
const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container (#root) not found in index.html");
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
