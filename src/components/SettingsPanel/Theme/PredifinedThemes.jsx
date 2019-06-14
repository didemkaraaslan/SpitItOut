import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Segment, Header, Checkbox, Form } from "semantic-ui-react";

import { themes } from "../../../utils/Theme";

class PredifinedThemes extends Component {
  handleThemeChange = (e, { value }) => {
    const { firebase, currentUser } = this.props;
    const currentUserUid = currentUser && currentUser.uid;

    firebase
      .update(`users/${currentUserUid}/prefs/theme`, { activeTheme: value })
      .then(() => {
        console.log("theme has changed to ", value);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const { activeTheme } = this.props;

    return (
      <Segment>
        <Header>
          Pre-defined themes
          <Header.Subheader>
            Pick one of the pre-defined themes we prepared for you or create
            create your own custom theme
          </Header.Subheader>
        </Header>
        <Grid columns={3}>
          <Grid.Column mobile={12} tablet={5} computer={5} textAlign="center">
            <Form>
              <Form.Field>
                <Checkbox
                  radio
                  name="checkboxRadioGroup"
                  value={themes.light.name}
                  checked={activeTheme === "light"}
                  onChange={this.handleThemeChange}
                />
                <span>
                  Light
                  <br />
                  <img
                    src="https://a.slack-edge.com/d65d3/img/themes/aubergine.png"
                    alt="aubergine theme"
                    className="themeImage"
                  />
                </span>
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  value={themes.dark.name}
                  checked={activeTheme === "dark"}
                  onChange={this.handleThemeChange}
                />
                <span>
                  Dark
                  <br />
                  <img
                    src="https://a.slack-edge.com/d65d3/img/themes/aubergine.png"
                    alt="auclassic theme"
                    className="themeImage"
                  />
                </span>
              </Form.Field>
            </Form>
          </Grid.Column>

          <Grid.Column mobile={12} tablet={5} computer={5} textAlign="center">
            <Form>
              <Form.Field>
                <Checkbox
                  radio
                  name="checkboxRadioGroup"
                  value="aubergine"
                  checked={activeTheme === "aubergine"}
                  onChange={this.handleThemeChange}
                />
                <span>
                  Aubergine
                  <br />
                  <img
                    src="https://a.slack-edge.com/d65d3/img/themes/aubergine.png"
                    alt="aubergine theme"
                    className="themeImage"
                  />
                </span>
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  name="checkboxRadioGroup"
                  value="auclassic"
                  checked={activeTheme === "auclassic"}
                  onChange={this.handleThemeChange}
                />
                <span>
                  Auclassic
                  <br />
                  <img
                    src="https://a.slack-edge.com/d65d3/img/themes/aubergine.png"
                    alt="auclassic theme"
                    className="themeImage"
                  />
                </span>
              </Form.Field>
            </Form>
          </Grid.Column>

          <Grid.Column mobile={12} tablet={5} computer={5} textAlign="center">
            <Form>
              <Form.Field>
                <Checkbox
                  radio
                  name="checkboxRadioGroup"
                  value="aubergine"
                  checked={activeTheme === "aubergine"}
                  onChange={this.handleThemeChange}
                />
                <span>
                  Aubergine
                  <br />
                  <img
                    src="https://a.slack-edge.com/d65d3/img/themes/aubergine.png"
                    alt="aubergine theme"
                    className="themeImage"
                  />
                </span>
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  name="checkboxRadioGroup"
                  value="auclassic"
                  checked={activeTheme === "auclassic"}
                  onChange={this.handleThemeChange}
                />
                <span>
                  Auclassic
                  <br />
                  <img
                    src="https://a.slack-edge.com/d65d3/img/themes/aubergine.png"
                    alt="auclassic theme"
                    className="themeImage"
                  />
                </span>
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

PredifinedThemes.propTypes = {
  firebase: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  activeTheme: PropTypes.string.isRequired
};

export default PredifinedThemes;
