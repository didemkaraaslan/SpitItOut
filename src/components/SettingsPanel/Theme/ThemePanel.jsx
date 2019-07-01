import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, getVal } from "react-redux-firebase";
import { useTranslation } from "react-i18next";
import PredifinedThemes from "./PredifinedThemes.jsx";

import { Segment, Header } from "semantic-ui-react";
import { themeColors } from "../../../utils/Theme";
import { TwitterPicker } from "react-color";

const ThemePanel = ({ activeTheme, firebase, currentUser }) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Header.Subheader style={{ marginBottom: "16px" }}>
        <em>{t("theme.customizeTheLookOfWorkspace")}</em>
      </Header.Subheader>
      <PredifinedThemes
        activeTheme={activeTheme}
        firebase={firebase}
        currentUser={currentUser}
      />

      <Segment>
        <Header size="medium">
          {t("theme.customTheme")}
          <Header.Subheader style={{ marginBottom: "16px" }}>
            {t("theme.createYourCustomTheme")}
          </Header.Subheader>
        </Header>

        <TwitterPicker colors={themeColors} color={"#E96C50"} width="310px" />
      </Segment>
    </React.Fragment>
  );
};

ThemePanel.propTypes = {
  t: PropTypes.func,
  firebase: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  activeTheme: PropTypes.string.isRequired
};

export default compose(
  firebaseConnect(props => {
    const uid = props.currentUser && props.currentUser.uid;
    return [{ path: `users/${uid}/prefs/theme` }];
  }),
  connect(({ firebase }, props) => ({
    activeTheme: getVal(
      firebase,
      `data/users/${props.currentUser.uid}/prefs/theme/activeTheme`
    )
  }))
)(ThemePanel);
