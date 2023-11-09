/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactDOM from "react-dom/client";
import "./style/style.css";
import { App } from "./App.tsx";

const rootElement = document.getElementById("root")!;

const renderWithStrictMode = (element: any, component: any) => {
  ReactDOM.createRoot(element).render(
    <React.StrictMode>{component}</React.StrictMode>
  );
};

renderWithStrictMode(rootElement, <App />);
