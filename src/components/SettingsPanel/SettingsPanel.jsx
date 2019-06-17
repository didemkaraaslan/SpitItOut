import React, { Component } from "react";
import PropTypes from "prop-types";

import * as Settings from "../../utils/Settings";
import ThemePanel from "../SettingsPanel/Theme/ThemePanel.jsx";
import { Container, Modal, Grid, Menu } from "semantic-ui-react";

class SettingsPanel extends Component {
  state = {
    activePreference: Settings.Notifications
  };

  handleItemClick = (e, { name }) => this.setState({ activePreference: name });

  renderRelatedSetting = activePreference => {
    const { firebase } = this.props;
    const currentUser = firebase.auth().currentUser;

    switch (activePreference) {
      case Settings.Notifications:
        return null;
      case Settings.LanguageAndRegion:
        return null;
      case Settings.Theme:
        return <ThemePanel currentUser={currentUser} />;
    }
  };

  render() {
    const { activePreference } = this.state;
    const { open, firebase, profile } = this.props;

    return (
      <Container style={{ marginTop: "50px" }}>
        <Modal
          size="fullscreen"
          open={open}
          onClose={this.props.handleCloseSettings}
          closeIcon
        >
          <Modal.Header>Adjust your preferences</Modal.Header>
          <Modal.Content>
            <Grid>
              <Grid.Column width={4}>
                <Menu fluid vertical tabular>
                  <Menu.Item
                    name={Settings.Notifications}
                    active={activePreference === Settings.Notifications}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name={Settings.LanguageAndRegion}
                    active={activePreference === Settings.LanguageAndRegion}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name={Settings.Theme}
                    active={activePreference === Settings.Theme}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name={Settings.Advanced}
                    active={activePreference === Settings.Advanced}
                    onClick={this.handleItemClick}
                  />
                </Menu>
              </Grid.Column>

              <Grid.Column stretched width={12} textAlign="center">
                {this.renderRelatedSetting(activePreference)}
              </Grid.Column>
            </Grid>
          </Modal.Content>
        </Modal>
      </Container>
    );
  }
}

SettingsPanel.propTypes = {
  firebase: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleCloseSettings: PropTypes.func.isRequired
};

export default SettingsPanel;
