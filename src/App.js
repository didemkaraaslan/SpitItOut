import React, { Suspense, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { Grid } from "semantic-ui-react";

import HeaderPanel from "./components/HeaderPanel/HeaderPanel.jsx";
import SidePanel from "./components/SidePanel/SidePanel.jsx";
import ContentPanel from "./components/ContentPanel/ContentPanel.jsx";
import SettingsPanel from "./components/SettingsPanel/SettingsPanel.jsx";
import ProfilePanel from "./components/ProfilePanel/ProfilePanel.jsx";

import { HashLoader } from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class App extends Component {
  state = {
    openSettingsModal: false,
    openUserProfile: false
  };

  handleOpenSettings = () => this.setState({ openSettingsModal: true });

  handleCloseSettings = () => this.setState({ openSettingsModal: false });

  handleOpenUserProfile = () => this.setState({ openUserProfile: true });

  handleCloseUserProfile = () => this.setState({ openUserProfile: false });

  render() {
    const { openSettingsModal, openUserProfile } = this.state;

    const {
      firebase,
      profile,
      confessions,
      filterCategory,
      currentUser,
      isLoading
    } = this.props;

    if (isLoading) {
      return (
        <Suspense fallback="loading">
          <Grid className="app">
            <div className="sweetloading">
              <HashLoader
                sizeUnit="px"
                size={100}
                color={"#123abc"}
                css={override}
              />
            </div>
          </Grid>
        </Suspense>
      );
    }

    return (
      <Suspense fallback="loading">
        <Grid className="app">
          <Grid.Row style={{ zIndex: 1000 }}>
            <HeaderPanel
              handleOpenSettings={this.handleOpenSettings}
              handleOpenUserProfile={this.handleOpenUserProfile}
              firebase={firebase}
              profile={profile}
              currentUser={currentUser}
            />
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={4}>
              <SidePanel
                filterCategory={filterCategory}
                currentUser={currentUser}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <SettingsPanel
                firebase={firebase}
                open={openSettingsModal}
                profile={profile}
                handleCloseSettings={this.handleCloseSettings}
              />
              {openUserProfile ? (
                <ProfilePanel
                  currentUser={currentUser}
                  confessions={confessions}
                  firebase={firebase}
                />
              ) : (
                <ContentPanel
                  firebase={firebase}
                  profile={profile}
                  confessions={confessions}
                  filterCategory={filterCategory}
                />
              )}
            </Grid.Column>
            <Grid.Column width={4} />
          </Grid.Row>
        </Grid>
      </Suspense>
    );
  }
}

App.propTypes = {
  firebase: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  confessions: PropTypes.array,
  filterCategory: PropTypes.string.isRequired,
  isLoading: PropTypes.bool
};

const mapStateToProps = (state, props) => ({
  profile: state.firebase.profile,
  confessions: state.firebase.ordered.confessions,
  filterCategory: state.confession.filterCategory,
  currentUser: state.user.currentUser,
  isLoading: state.user.isLoading
});

export default compose(
  firebaseConnect(["confessions"]),
  connect(mapStateToProps)
)(App);
