import React from "react";
import "bulma/css/bulma.css";
import "./App.css";
import { Route, BrowserRouter as Router, useParams } from "react-router-dom";
import Index from "./scenes/Index";
import Guest from "./scenes/Guest.js";
import User from "./scenes/User.js";
import ChartLayout from "./components/Charts/ChartLayout";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Index} />
        <Route path="/guest/:playlist" component={ChartLayout} />
        <Route path="/guest" component={Guest} />
        <Route path="/user" component={User} />
      </Router>
    </div>
  );
}

export default App;
