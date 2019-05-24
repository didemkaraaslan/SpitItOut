import React, { Component } from "react";
import PropTypes from "prop-types";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { ALL } from "../../utils/Tags";
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
    const { firebase } = this.props;
    const currentUser = firebase.auth().currentUser;
    const currentUserUid = currentUser && currentUser.uid;

    let filteredConfessions = confessions;
    // Filter out confessions which doesn't include chosen category
    if (filterCategory !== ALL) {
      filteredConfessions = confessions.filter(({ key, value }) =>
        value.tags.some(tag => tag === filterCategory)
      );
    }

    return filteredConfessions.map(({ key, value }) => (
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
