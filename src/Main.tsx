import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./style/style.css";

const rootElement = document.getElementById("root")!;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* eslint-disable @typescript-eslint/no-explicit-any */