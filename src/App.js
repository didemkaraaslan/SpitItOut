import React, { Component, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { Grid } from "semantic-ui-react";

import HeaderPanel from "./components/HeaderPanel/HeaderPanel.jsx";
import SidePanel from "./components/SidePanel/SidePanel.jsx";
import ContentPanel from "./components/ContentPanel/ContentPanel.jsx";
import SettingsPanel from "./components/SettingsPanel/SettingsPanel.jsx";

class App extends Component {
  state = {
    openSettings: false
  };

  handleOpenSettings = () => this.setState({ openSettings: true });

  render() {
    const { openSettings } = this.state;

    const { firebase, profile, confessions, filterCategory } = this.props;

    return (
      <Grid className="app">
        <Grid.Row>
          <HeaderPanel
            handleOpenSettings={this.handleOpenSettings}
            firebase={firebase}
            profile={profile}
          />
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={4}>
            <SidePanel filterCategory={filterCategory} />
          </Grid.Column>
          <Grid.Column width={8}>
            {openSettings && (
              <SettingsPanel firebase={firebase} profile={profile} />
            )}
            <ContentPanel
              firebase={firebase}
              profile={profile}
              confessions={confessions}
              filterCategory={filterCategory}
            />
          </Grid.Column>
          <Grid.Column width={4} />
        </Grid.Row>
      </Grid>
    );
  }
}

App.propTypes = {
  firebase: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  confessions: PropTypes.array,
  filterCategory: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  profile: state.firebase.profile,
  confessions: state.firebase.ordered.confessions,
  filterCategory: state.confession.filterCategory
});

export default compose(
  firebaseConnect(["confessions"]),
  connect(mapStateToProps)
)(App);
