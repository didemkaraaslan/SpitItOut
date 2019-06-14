import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, getVal } from "react-redux-firebase";

import PredifinedThemes from "./PredifinedThemes.jsx";

import { Segment, Header } from "semantic-ui-react";
import { themeColors } from "../../../utils/Theme";
import { TwitterPicker } from "react-color";

const ThemePanel = ({ activeTheme, firebase, currentUser }) => (
  <React.Fragment>
    <Header.Subheader style={{ marginBottom: "16px" }}>
      Customize the look of your workspace. Only you will see this.
    </Header.Subheader>
    <PredifinedThemes
      activeTheme={activeTheme}
      firebase={firebase}
      currentUser={currentUser}
    />

    <Segment>
      <Header size="medium">
        Custom Theme
        <Header.Subheader style={{ marginBottom: "16px" }}>
          Create your own gorgeous custom theme
        </Header.Subheader>
      </Header>

      <TwitterPicker colors={themeColors} color={"#E96C50"} width="310px" />
    </Segment>
  </React.Fragment>
);

ThemePanel.propTypes = {
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
