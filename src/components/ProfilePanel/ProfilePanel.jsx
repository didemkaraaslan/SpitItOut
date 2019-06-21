import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Grid, Card, Icon, Image, Tab } from "semantic-ui-react";
import MyConfessions from "./MyConfessions.jsx";
import Favorites from "./Favorites.jsx";
import LikedConfessions from "./LikedConfessions.jsx";

import faker from "faker";

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
          console.log("dislike")
          })
          .catch(error => {
          console.error(error)
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
        console.log("added to favorites")
        })
        .catch(error => {
        console.error(error)
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
          <Image
            src={faker.internet.avatar()}
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
  confessions: PropTypes.array.isRequired
};

export default ProfilePanel;
