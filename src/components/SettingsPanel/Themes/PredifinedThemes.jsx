import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Segment, Header, Checkbox, Form } from "semantic-ui-react";

import { themes } from "../../../utils/Theme";

class PredifinedThemes extends Component {
  state = {
    theme: themes.light
  };

  handleChange = (e, { value }) => {
    const { firebase } = this.props;
    const currentUser = firebase.auth().currentUser;
    const currentUserUid = currentUser && currentUser.uid;

    this.setState({ theme: themes[value] }, () => {
      firebase
        .push(`users/${currentUserUid}/prefs/theme`, themes[value])
        .then(() => {
          console.log("theme has changed to ", themes[value]);
        })
        .catch(error => {
          console.error(error);
        });
    });
  };

  render() {
    const { theme } = this.state;
    const themeName = theme.name;

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
                  checked={themeName === "light"}
                  onChange={this.props.handleThemeChange}
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
                  checked={themeName === "dark"}
                  onChange={this.props.handleThemeChange}
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
                  checked={themeName === "aubergine"}
                  onChange={this.props.handleThemeChange}
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
                  checked={themeName === "auclassic"}
                  onChange={this.props.handleThemeChange}
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
                  checked={themeName === "aubergine"}
                  onChange={this.props.handleThemeChange}
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
                  checked={themeName === "auclassic"}
                  onChange={this.props.handleThemeChange}
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
  firebase: PropTypes.object.isRequired
};

export default PredifinedThemes;
