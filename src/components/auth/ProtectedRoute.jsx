import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticatedUser, ...props }) =>
  isAuthenticatedUser ? <Route {...props} /> : <Redirect to="/signin" />;

ProtectedRoute.propTypes = {
  isAuthenticatedUser: PropTypes.bool
};

export default ProtectedRoute;
