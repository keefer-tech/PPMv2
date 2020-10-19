import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Index from "./scenes/Index";
import Guest from "./scenes/Guest.js";
import "bulma/css/bulma.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Index} />
        <Route path="/guest" component={Guest} />
      </Router>
    </div>
  );
}

export default App;
