import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./theme.css";

const el = document.getElementById("root");
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Prerendered HTML is already in #root in production, so hydrate it.
// In dev the div is empty, so mount fresh.
if (el.hasChildNodes()) {
  hydrateRoot(el, app);
} else {
  createRoot(el).render(app);
}
