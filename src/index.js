import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Provider, connect } from "react-redux";
import { createStore, compose } from "redux";
import { reactReduxFirebase } from "react-redux-firebase";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import { Switch } from "react-router";
import firebase from "./firebase.js";
import "firebase/auth";
import "firebase/database";
import { composeWithDevTools } from "redux-devtools-extension";
import { setUser } from "./actions/userActions";

import rootReducer from "./reducers/rootReducer.js";
import "./index.css";

import App from "./App";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import NoMatch from "./components/NoMatch.jsx";

// react-redux-firebase options
const rrfConfig = {
  userProfile: "users",
  enableLogging: false
};

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig)
)(createStore);

// Create store with reducers and initial state
const store = createStoreWithFirebase(rootReducer, composeWithDevTools());

class Root extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User signed in
        console.log("user is signed in")
        // set current user in redux store
        this.props.setUser(user);
      } else {
        //sadasd
        this.props.history.push("/signin");
      }
    });
  }

  render() {
    return (
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signin" component={Login} />
        <Route path="/register" component={Signup} />
        <Route component={NoMatch} />
      </Switch>
    );
  }
}

const RootWithAuth = withRouter(
  connect(
    null,
    { setUser }
  )(Root)
);

Root.propTypes = {
  history: PropTypes.object,
  setUser: PropTypes.func
};

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);
