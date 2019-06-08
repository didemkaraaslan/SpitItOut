import React, { lazy, Suspense } from "react";
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
import { HashLoader } from "react-spinners";
import { css } from "@emotion/core";

const App = lazy(() => import("./App"));
const Login = lazy(() => import("./components/auth/Login"));
const Signup = lazy(() => import("./components/auth/Signup"));
const NoMatch = lazy(() => import("./components/NoMatch"));

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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
      <Suspense
        fallback={
          <div className="sweetloading">
            <HashLoader
              sizeUnit="px"
              size={100}
              color={"#123abc"}
              css={override}
            />
          </div>
        }
      >
        <RootWithAuth />
      </Suspense>
    </Router>
  </Provider>,
  document.getElementById("root")
);
