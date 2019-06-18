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
                  value={themes.light.name}
                  checked={activeTheme === themes.light.name}
                  onChange={this.handleThemeChange}
                />
                <span>
                  Light
                  <br />
                  <img
                    src="https://a.slack-edge.com/d65d3/img/themes/aubergine.png"
                    alt="light theme"
                    className="themeImage"
                  />
                </span>
              </Form.Field>

              <Form.Field>
                <Checkbox
                  radio
                  value={themes.lightGrey.name}
                  checked={activeTheme === themes.lightGrey.name}
                  onChange={this.handleThemeChange}
                />
                <span>
                  Light Grey
                  <br />
                  <img
                    src="https://a.slack-edge.com/d65d3/img/themes/aubergine.png"
                    alt="LightGrey theme"
                    className="themeImage"
                  />
                </span>
              </Form.Field>

              <Form.Field>
                <Checkbox
                  radio
                  value={themes.lightTeal.name}
                  checked={activeTheme === themes.lightTeal.name}
                  onChange={this.handleThemeChange}
                />
                <span>
                  Light Teal
                  <br />
                  <img
                    src="https://a.slack-edge.com/d65d3/img/themes/aubergine.png"
                    alt="LightTeal theme"
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
                  value={themes.lightBlue.name}
                  checked={activeTheme === themes.lightBlue.name}
                  onChange={this.handleThemeChange}
                />
                <span>
                  Light Blue
                  <br />
                  <img
                    src="https://a.slack-edge.com/d65d3/img/themes/aubergine.png"
                    alt="LightBlue theme"
                    className="themeImage"
                  />
                </span>
              </Form.Field>

              <Form.Field>
                <Checkbox
                  radio
                  value={themes.lightOrange.name}
                  checked={activeTheme === themes.lightOrange.name}
                  onChange={this.handleThemeChange}
                />
                <span>
                  Light Orange
                  <br />
                  <img
                    src="https://a.slack-edge.com/d65d3/img/themes/aubergine.png"
                    alt="LightOrange theme"
                    className="themeImage"
                  />
                </span>
              </Form.Field>

              <Form.Field>
                <Checkbox
                  radio
                  value={themes.lightPurple.name}
                  checked={activeTheme === themes.lightPurple.name}
                  onChange={this.handleThemeChange}
                />
                <span>
                  Light Purple
                  <br />
                  <img
                    src="https://a.slack-edge.com/d65d3/img/themes/aubergine.png"
                    alt="LightPurple theme"
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
                  value={themes.dark.name}
                  checked={activeTheme === themes.dark.name}
                  onChange={this.handleThemeChange}
                />
                <span>
                  Dark
                  <br />
                  <img
                    src="https://a.slack-edge.com/d65d3/img/themes/aubergine.png"
                    alt="dark theme"
                    className="themeImage"
                  />
                </span>
              </Form.Field>

              <Form.Field>
                <Checkbox
                  radio
                  value={themes.darkOrange.name}
                  checked={activeTheme === themes.darkOrange.name}
                  onChange={this.handleThemeChange}
                />
                <span>
                  Dark Orange
                  <br />
                  <img
                    src="https://a.slack-edge.com/d65d3/img/themes/aubergine.png"
                    alt="DarkOrange theme"
                    className="themeImage"
                  />
                </span>
              </Form.Field>

              <Form.Field>
                <Checkbox
                  radio
                  value={themes.darkTeal.name}
                  checked={activeTheme === themes.darkTeal.name}
                  onChange={this.handleThemeChange}
                />
                <span>
                  Dark Teal
                  <br />
                  <img
                    src="https://a.slack-edge.com/d65d3/img/themes/aubergine.png"
                    alt="DarkTeal theme"
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
