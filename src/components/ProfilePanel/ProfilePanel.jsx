import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Icon, Image, Tab } from "semantic-ui-react";
import MyConfessions from "./MyConfessions.jsx";
import Favorites from "./Favorites.jsx";
import LikedConfessions from "./LikedConfessions.jsx";

class ProfilePanel extends Component {
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
          .database()
          .ref(`confessions/${confessionId}`)
          .transaction(function(updateConfession) {
            if (updateConfession) {
              if (
                updateConfession.feelings !== null &&
                updateConfession.numberOfLikes !== null &&
                updateConfession.numberOfDislikes !== null
              ) {
                updateConfession.feelings[currentUserUid] = 1;
                updateConfession.numberOfLikes =
                  updateConfession.numberOfLikes + 1;
                updateConfession.numberOfDislikes =
                  userReaction === 0
                    ? updateConfession.numberOfDislikes
                    : updateConfession.numberOfDislikes - 1;
              }
            }
            return updateConfession;
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
          .database()
          .ref(`confessions/${confessionId}`)
          .transaction(function(updateConfession) {
            if (updateConfession) {
              if (
                updateConfession.feelings !== null &&
                updateConfession.numberOfLikes !== null &&
                updateConfession.numberOfDislikes !== null
              ) {
                updateConfession.feelings[currentUserUid] = -1;
                updateConfession.numberOfDislikes =
                  updateConfession.numberOfDislikes + 1;
                updateConfession.numberOfLikes =
                  userReaction === 0
                    ? updateConfession.numberOfLikes
                    : updateConfession.numberOfLikes - 1;
              }
            }
            return updateConfession;
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

  render() {
    const { currentUser, confessions } = this.props;
    const orderedConfessions = confessions.sort(
      (a, b) => b.value.timestamp - a.value.timestamp
    );

    return (
      <Segment style={{ marginTop: "50px", position: "relative" }}>
        <div className="profile__top__area">
          <button
            className="backBtn"
            onClick={this.props.handleCloseUserProfile}
          >
            <Icon link name="left arrow" />
          </button>
          <Image
            src={currentUser && currentUser.photoURL}
            circular
            bordered
            className="profile__avatar"
          />
          <span className="profile__user__name">{currentUser.displayName}</span>
          <q className="profile__user__biography">
            You know you are in love when you cant fall asleep because reality
            finally better than your dreams.
          </q>
        </div>
        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={[
            {
              menuItem: "My Confessions",
              render: () => (
                <Tab.Pane attached={false}>
                  <MyConfessions
                    confessions={orderedConfessions}
                    currentUser={currentUser}
                    handleLike={this.handleLike}
                    handleDislike={this.handleDislike}
                    addFavorite={this.addFavorite}
                  />
                </Tab.Pane>
              )
            },
            {
              menuItem: "Liked Confessions",
              render: () => (
                <Tab.Pane attached={false}>
                  <LikedConfessions
                    confessions={orderedConfessions}
                    currentUser={currentUser}
                    handleLike={this.handleLike}
                    handleDislike={this.handleDislike}
                    addFavorite={this.addFavorite}
                  />
                </Tab.Pane>
              )
            },
            {
              menuItem: "Favorites",
              render: () => (
                <Tab.Pane attached={false}>
                  <Favorites
                    confessions={orderedConfessions}
                    currentUser={currentUser}
                    handleLike={this.handleLike}
                    handleDislike={this.handleDislike}
                    addFavorite={this.addFavorite}
                  />
                </Tab.Pane>
              )
            }
          ]}
        />
      </Segment>
    );
  }
}

ProfilePanel.propTypes = {
  firebase: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  confessions: PropTypes.array.isRequired,
  handleCloseUserProfile: PropTypes.func
};

export default ProfilePanel;
