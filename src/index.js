import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, compose } from "redux";
import { reactReduxFirebase } from "react-redux-firebase";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import firebase from "./firebase.js";
import "firebase/auth";
import "firebase/database";

import App from "./App";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import rootReducer from "./reducers/rootReducer.js";

import "./index.css";

// react-redux-firebase options
const rrfConfig = {
  userProfile: "users",
  enableLogging: false
};

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig)
)(createStore);

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/signin" component={Login} />
        <Route path="/register" component={Signup} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
