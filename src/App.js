import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { Grid } from "semantic-ui-react";

import HeaderPanel from "./components/HeaderPanel/HeaderPanel.jsx";
import SidePanel from "./components/SidePanel/SidePanel.jsx";
import ContentPanel from "./components/ContentPanel/ContentPanel.jsx";

class App extends Component {
  state = {
    activeMenuItem: ""
  };

  handleMenuItemClick = (e, { name }) => {
    this.setState({ activeMenuItem: name });
  };

  render() {
    const { activeHeaderMenuItem, activeMenuItem } = this.state;

    const { firebase, profile, confessions } = this.props;

    return (
      <Grid>
        <Grid.Row>
          <HeaderPanel
            activeHeaderMenuItem={activeHeaderMenuItem}
            handleHeaderMenuItemClick={this.handleHeaderMenuItemClick}
            firebase={firebase}
            profile={profile}
          />
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={3}>
            <SidePanel
              activeItem={activeMenuItem}
              handleMenuItemClick={this.handleMenuItemClick}
            />
          </Grid.Column>
          <Grid.Column width={12}>
            <ContentPanel
              firebase={firebase}
              profile={profile}
              confessions={confessions}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

App.propTypes = {
  firebase: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  confessions: PropTypes.object
};

export default compose(
  firebaseConnect(["confessions"]),
  connect(state => ({
    profile: state.firebase.profile,
    confessions: state.firebase.data.confessions
  }))
)(App);
