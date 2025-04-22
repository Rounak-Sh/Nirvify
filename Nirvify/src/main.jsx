import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import PlayerControlProvider from "./playerLogic/PlayerControls.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PlayerControlProvider>
        <App />
      </PlayerControlProvider>
    </BrowserRouter>
  </StrictMode>
);
