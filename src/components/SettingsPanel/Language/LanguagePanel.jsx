import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, getVal } from "react-redux-firebase";

import { Header, Dropdown } from "semantic-ui-react";

const languageOptions = [
  {
    key: 0,
    text: "Turkish (TR)",
    value: "Turkish (TR)"
  },
  {
    key: 1,
    text: "English (EN)",
    value: "English (EN)"
  }
];

const LanguagePanel = ({ firebase, currentUser, language }) => (
  <React.Fragment>
    <Header.Subheader style={{ marginBottom: "6px" }}>
      <em>Choose the language you’d like to use with SpitItOut.</em>
    </Header.Subheader>
    <div>
      <Header.Subheader style={{ marginBottom: "3px" }}>
        <b>Language</b>
      </Header.Subheader>
      <Dropdown
        placeholder="Choose language"
        search
        selection
        value={language && language}
        options={languageOptions}
        onChange={(e, data) => {
          const currentUserUid = currentUser && currentUser.uid;
          firebase
            .update(`users/${currentUserUid}/prefs/language`, {
              language: data.value
            })
            .then(() => {
              console.log("language has changed to ", data.value);
            })
            .catch(error => {
              console.error(error);
            });
        }}
      />
    </div>
  </React.Fragment>
);

LanguagePanel.propTypes = {
  firebase: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired
};

export default compose(
  firebaseConnect(props => {
    const uid = props.currentUser && props.currentUser.uid;
    return [{ path: `users/${uid}/prefs/language` }];
  }),
  connect(({ firebase }, props) => ({
    language: getVal(
      firebase,
      `data/users/${props.currentUser.uid}/prefs/language/language`
    )
  }))
)(LanguagePanel);
