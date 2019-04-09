import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import "./index.css";

import App from "./App";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/signin" component={Login} />
      <Route path="/register" component={Signup} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
