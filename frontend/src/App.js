import React from "react";
import "bulma/css/bulma.css";
import "./App.css";
import "./custom.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Index from "./scenes/Index";
import Guest from "./scenes/Guest.js";
import User from "./scenes/User.js";
import MainTitle from "./components/Headers/MainTitle";
import GuestVisual from "./scenes/GuestVisual";
import Footer from "./components/Headers/Footer";
import NotFoundPage from "./scenes/NotFound";

function App() {
  return (
    <div className="App">
      <MainTitle />
      <Router>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route exact path="/guest" component={Guest} />
          <Route path="/guest/:playlist" component={GuestVisual} />
          <Route path="/user" component={User} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
