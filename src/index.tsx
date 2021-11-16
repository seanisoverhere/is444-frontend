import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Windmill } from "@windmill/react-ui";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Windmill>
        <App />
      </Windmill>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
