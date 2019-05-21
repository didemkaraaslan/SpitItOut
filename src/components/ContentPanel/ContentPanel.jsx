import React, { Component } from "react";
import PropTypes from "prop-types";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { ALL } from "../../utils/Tags";
import { Container } from "semantic-ui-react";

import Confession from "./Confession.jsx";

class ContentPanel extends Component {
  state = {};

  filterConfessions = (confessions, filterCategory) => {
    let filteredConfessions = confessions;
    if (filterCategory !== ALL) {
      filteredConfessions = confessions.filter(
        ({ key, value }) => value.tag === filterCategory
      );
    }

    return filteredConfessions.map(({ key, value }) => (
      <Confession key={key} id={key} confession={value} />
    ));
  };

  render() {
    const { confessions, filterCategory } = this.props;

    const confessionList = !isLoaded(confessions)
      ? "Loading.."
      : isEmpty(confessions)
      ? "List is empty"
      : this.filterConfessions(confessions, filterCategory);

    return (
      <Container style={{ marginTop: "50px" }}>{confessionList}</Container>
    );
  }
}

ContentPanel.propTypes = {
  confessions: PropTypes.array,
  profile: PropTypes.object,
  filterCategory: PropTypes.string.isRequired
};

export default ContentPanel;
