import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Segment, Header, Checkbox, Form } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

import { themes } from "../../../utils/Theme";

const PredifinedThemes = ({ firebase, currentUser, activeTheme }) => {
  const { t } = useTranslation();

  const handleThemeChange = (e, { value }) => {
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

  return (
    <Segment>
      <Header>
        {t("predefinedThemes.predefinedThemes")}
        <Header.Subheader>
          {t("predefinedThemes.pickOneOfThePredefinedThemes")}
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
                onChange={handleThemeChange}
              />
              <span>
                {t("predefinedThemes.light")}
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
                onChange={handleThemeChange}
              />
              <span>
                {t("predefinedThemes.lightGrey")}
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
                onChange={handleThemeChange}
              />
              <span>
                {t("predefinedThemes.lightTeal")}
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
                onChange={handleThemeChange}
              />
              <span>
                {t("predefinedThemes.lightBlue")}
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
                onChange={handleThemeChange}
              />
              <span>
                {t("predefinedThemes.lightOrange")}
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
                onChange={handleThemeChange}
              />
              <span>
                {t("predefinedThemes.lightPurple")}
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
                onChange={handleThemeChange}
              />
              <span>
                {t("predefinedThemes.dark")}
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
                onChange={handleThemeChange}
              />
              <span>
                {t("predefinedThemes.darkOrange")}
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
                onChange={handleThemeChange}
              />
              <span>
                {t("predefinedThemes.darkTeal")}
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
};

PredifinedThemes.propTypes = {
  t: PropTypes.func,
  firebase: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  activeTheme: PropTypes.string.isRequired
};

export default PredifinedThemes;
