import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/manrope";
import { App } from "./App";
import "./styles.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Elemento raiz da aplicação não encontrado.");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
