import React, { Component } from "react";
import PropTypes from "prop-types";

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
    activePreference: "Notifications"
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
                    name="Notifications"
                    active={activePreference === "Notifications"}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="Language & Region"
                    active={activePreference === "Language & Region"}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="Theme"
                    active={activePreference === "Theme"}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="Advanced"
                    active={activePreference === "Advanced"}
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
