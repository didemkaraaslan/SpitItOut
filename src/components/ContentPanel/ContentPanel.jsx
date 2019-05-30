import React, { Component } from "react";
import PropTypes from "prop-types";
import { isLoaded, isEmpty } from "react-redux-firebase";
import {
  ALL,
  LATEST,
  MOST_TRENDING,
  MOST_APPROVED,
  MOST_JUDGED,
  MOST_COMMENTED
} from "../../utils/Tags";
import { Container } from "semantic-ui-react";

import Confession from "./Confession.jsx";

class ContentPanel extends Component {
  state = {};

  handleLike = (confession, confessionId) => {
    const { firebase } = this.props;

    if (firebase.auth().currentUser) {
      const currentUserUid = firebase.auth().currentUser.uid;
      /* Check if the user already have a feeling about this confession */

      const userReaction = confession.feelings[currentUserUid];
      const userAlreadyLiked = userReaction === 1;

      if (!userAlreadyLiked) {
        firebase
          .update(`confessions/${confessionId}`, {
            ...confession,
            feelings: {
              ...confession.feelings,
              [currentUserUid]: 1
            },
            numberOfLikes: confession.numberOfLikes + 1,
            numberOfDislikes:
              userReaction === 0
                ? confession.numberOfDislikes
                : confession.numberOfDislikes - 1
          })
          .then(() => {
          console.log("like")
          })
          .catch(error => {
          console.error(error)
          });
      }
    }
  };

  handleDislike = (confession, confessionId) => {
    const { firebase } = this.props;

    if (firebase.auth().currentUser) {
      const currentUserUid = firebase.auth().currentUser.uid;
      /* Check if the user already have a feeling about this confession */

      const userReaction = confession.feelings[currentUserUid];
      const userAlreadyDisliked = userReaction === -1;

      if (!userAlreadyDisliked) {
        firebase
          .update(`confessions/${confessionId}`, {
            ...confession,
            feelings: {
              ...confession.feelings,
              [currentUserUid]: -1
            },
            numberOfDislikes: confession.numberOfDislikes + 1,
            numberOfLikes:
              userReaction === 0
                ? confession.numberOfLikes
                : confession.numberOfLikes - 1
          })
          .then(() => {
          console.log("dislike")
          })
          .catch(error => {
          console.error(error)
          });
      }
    }
  };

  filterConfessions = (confessions, filterCategory) => {
    const specialFilterCategories = [
      LATEST,
      MOST_TRENDING,
      MOST_APPROVED,
      MOST_JUDGED,
      MOST_COMMENTED
    ];

    // If ALL filter category is not selected then apply the selected filter

    // Check if special category filtering shall be applied
    const applySpecialCategoryFilter = specialFilterCategories.some(
      specialFilter => specialFilter === filterCategory
    );

    if (applySpecialCategoryFilter) {
      console.log("special filter");
      return this.applySpecialCategoryFilter(filterCategory, confessions);
    } else {
      console.log("normal filter");
      return this.applyCategoryFilter(filterCategory, confessions);
    }
  };

  applyCategoryFilter = (filterCategory, confessions) => {
    let filteredConfessions = confessions;

    if (filterCategory !== ALL) {
      filteredConfessions = confessions.filter(({ key, value }) =>
        value.tags.some(tag => tag === filterCategory)
      );
    }

    console.log(filteredConfessions)
    return this.displayFilteredConfessions(filteredConfessions);
  };

  applySpecialCategoryFilter = (filterCategory, confessions) => {
    switch (filterCategory) {
      case LATEST:
        break;
      case MOST_TRENDING:
        break;
      case MOST_APPROVED:
        break;
      case MOST_JUDGED:
        break;
      case MOST_COMMENTED:
        break;
    }

    this.displayFilteredConfessions(confessions);
  };

  displayFilteredConfessions = confessions => {
    const { firebase } = this.props;
    const currentUser = firebase.auth().currentUser;
    const currentUserUid = currentUser && currentUser.uid;

    return confessions.map(({ key, value }) => (
      <Confession
        key={key}
        id={key}
        confession={value}
        confessionId={key}
        currentUserUid={currentUserUid}
        handleLike={this.handleLike}
        handleDislike={this.handleDislike}
      />
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
  firebase: PropTypes.object,
  confessions: PropTypes.array,
  profile: PropTypes.object,
  filterCategory: PropTypes.string.isRequired
};

export default ContentPanel;
