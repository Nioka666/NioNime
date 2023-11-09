/* eslint-disable @typescript-eslint/no-explicit-any */
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

// const renderWithStrictMode = (element: any, component: any) => {
//   ReactDOM.createRoot(element).render(
//     <React.StrictMode>{component}</React.StrictMode>
//   );
// };

// renderWithStrictMode(rootElement, <App />);
