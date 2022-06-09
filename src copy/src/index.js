import React from "react";
import App from "./App";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import {initialState} from "./context/initialState";
import reducer from "./context/reducer";
import {StateProvider} from "./context/StateProvider"



const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  // <StrictMode>
  <Router>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </Router>,
  // </StrictMode>
);
