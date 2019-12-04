import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import { MenuProvider } from "./components/context";

ReactDOM.render(
  <MenuProvider>
    <Router>
      <App />
    </Router>
  </MenuProvider>,
  document.getElementById("root")
);
