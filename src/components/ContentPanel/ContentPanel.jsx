import React, { Component, lazy, Suspense } from "react";
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
import ConfessionSkeleton from "./ConfessionSkeleton.jsx";
import NoConfessionData from "../empty/NoConfessionData.jsx";

class ContentPanel extends Component {
  state = {};

  handleLike = (confession, confessionId) => {
    const { firebase } = this.props;

    if (firebase.auth().currentUser) {
      const currentUserUid = firebase.auth().currentUser.uid;
      /* Check if the user already have a feeling about this confession */

      let userReaction = confession.feelings[currentUserUid];
      userReaction = userReaction == null ? 0 : userReaction;
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
            console.log("like");
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };

  handleDislike = (confession, confessionId) => {
    const { firebase } = this.props;

    if (firebase.auth().currentUser) {
      const currentUserUid = firebase.auth().currentUser.uid;
      /* Check if the user already have a feeling about this confession */

      let userReaction = confession.feelings[currentUserUid];
      userReaction = userReaction == null ? 0 : userReaction;
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
            console.log("dislike");
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };

  addFavorite = (confession, confessionId) => {
    const { firebase } = this.props;

    if (firebase.auth().currentUser) {
      const currentUserUid = firebase.auth().currentUser.uid;
      /* Check if the user already add this confession to his/her favorites */

      let userReaction = confession.favorites[currentUserUid];
      userReaction = userReaction == null ? 0 : userReaction;

      firebase
        .update(`confessions/${confessionId}`, {
          ...confession,
          favorites: {
            ...confession.favorites,
            [currentUserUid]: userReaction === 0 ? 1 : 0
          }
        })
        .then(() => {
          console.log("added to favorites");
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  postComment = (confession, confessionId, replyCommentId, comment) => {
    const { firebase } = this.props;

    if (!comment) {
      return;
    }

    // Set the timestamp when the comment has been made
    comment.timestamp = firebase.database.ServerValue.TIMESTAMP;

    console.log(replyCommentId.length);

    if (!replyCommentId || replyCommentId.length === 0) {
      console.log("direct comment");
      // If the comment is not a direct reply to other users comment
      firebase
        .push(`comments/${confessionId}`, comment)
        .then(() => {
          console.log("success");
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      console.log("hehehe");
      firebase
        .push(`comments/${confessionId}/${replyCommentId}/replies`, comment)
        .then(() => {
          console.log("success");
        })
        .catch(error => {
          console.error(error);
        });
    }

    // Update comment count
    firebase.update(`confessions/${confessionId}`, {
      ...confession,
      numberOfComments: confession.numberOfComments + 1
    });
  };

  filterConfessions = (confessions, filterCategory) => {
    if (isEmpty(confessions)) {
      return <NoConfessionData filterCategory={filterCategory} />;
    }

    const orderedConfessions = confessions.sort(
      (a, b) => b.value.timestamp - a.value.timestamp
    );

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
      return this.applySpecialCategoryFilter(
        filterCategory,
        orderedConfessions
      );
    } else {
      return this.applyCategoryFilter(filterCategory, orderedConfessions);
    }
  };

  applyCategoryFilter = (filterCategory, confessions) => {
    let filteredConfessions = confessions;

    if (filterCategory !== ALL) {
      filteredConfessions = confessions.filter(({ key, value }) =>
        value.tags.some(tag => tag === filterCategory)
      );
    }
    return this.displayFilteredConfessions(filteredConfessions, filterCategory);
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

    this.displayFilteredConfessions(confessions, filterCategory);
  };

  displayFilteredConfessions = (confessions, filterCategory) => {
    const { firebase } = this.props;
    const currentUser = firebase.auth().currentUser;
    const currentUserUid = currentUser && currentUser.uid;

    if (confessions.length <= 0) {
      return <NoConfessionData filterCategory={filterCategory} />;
    }

    return confessions.map(({ key, value }) => (
      <Confession
        key={key}
        id={key}
        confession={value}
        confessionId={key}
        postComment={this.postComment}
        currentUser={currentUser}
        currentUserUid={currentUserUid}
        handleLike={this.handleLike}
        handleDislike={this.handleDislike}
        addFavorite={this.addFavorite}
      />
    ));
  };

  showSkeletonView = () =>
    [...Array(6)].map((_, i) => <ConfessionSkeleton key={i} />);

  render() {
    const { confessions, filterCategory } = this.props;

    const confessionList = !isLoaded(confessions)
      ? this.showSkeletonView()
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
