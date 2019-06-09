import React, { Component } from "react";
import PropTypes from "prop-types";

import * as Settings from "../../utils/Settings";

import {
  Container,
  Modal,
  Button,
  Grid,
  Menu,
  Segment
} from "semantic-ui-react";

class SettingsPanel extends Component {
  state = {
    activePreference: Settings.Notifications
  };

  handleItemClick = (e, { name }) => this.setState({ activePreference: name });

  render() {
    const { activePreference } = this.state;
    const { firebase, profile } = this.props;

    return (
      <Container style={{ marginTop: "50px" }}>
        <Modal size="fulscreen" open>
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

              <Grid.Column stretched width={12}>
                <Segment>
                  This is an stretched grid column. This segment will always match
                  tab height
                </Segment>
              </Grid.Column>
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            <Button negative>No</Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>
      </Container>
    );
  }
}

SettingsPanel.propTypes = {
  firebase: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default SettingsPanel;
