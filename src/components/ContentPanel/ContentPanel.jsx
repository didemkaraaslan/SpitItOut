import React, { Component } from "react";
import PropTypes from "prop-types";
import { isLoaded, isEmpty } from "react-redux-firebase";

import { Container } from "semantic-ui-react";

import Confession from "./Confession.jsx";

class ContentPanel extends Component {
  state = {};

  render() {
    const { confessions } = this.props;

    const confessionList = !isLoaded(confessions)
      ? "Loading.."
      : isEmpty(confessions)
      ? "List is empty"
      : Object.keys(confessions).map((key, id) => (
          <Confession key={key} id={id} confession={confessions[key]} />
        ));

    return (
      <Container style={{ marginTop: "50px" }}>{confessionList}</Container>
    );
  }
}

ContentPanel.propTypes = {
  confessions: PropTypes.object,
  profile: PropTypes.object
};

export default ContentPanel;
