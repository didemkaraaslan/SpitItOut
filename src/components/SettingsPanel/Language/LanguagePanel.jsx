import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, getVal } from "react-redux-firebase";
import { useTranslation } from "react-i18next";

import { Header, Dropdown } from "semantic-ui-react";

const languageOptions = [
  {
    key: 0,
    text: "Turkish (TR)",
    value: "tr"
  },
  {
    key: 1,
    text: "English (EN)",
    value: "en-US"
  }
];

const LanguagePanel = ({ firebase, currentUser, language }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng).then(t => {
      const currentUserUid = currentUser && currentUser.uid;
      firebase
        .update(`users/${currentUserUid}/prefs/language`, {
          language: lng
        })
        .then(() => {
          console.log("language changed");
        })
        .catch(error => {
          console.error(error);
        });
    });
  };

  return (
    <Suspense fallback={<h1>laoding</h1>}>
      <Header.Subheader style={{ marginBottom: "6px" }}>
        <em>{t("language.chooseLanguageYoulike")}</em>
      </Header.Subheader>
      <div>
        <Header.Subheader style={{ marginBottom: "3px" }}>
          <b>{t("language.language")}</b>
        </Header.Subheader>
        <Dropdown
          placeholder="Choose language"
          search
          selection
          value={language}
          options={languageOptions}
          onChange={(e, data) => {
            changeLanguage(data.value);
          }}
        />
      </div>
    </Suspense>
  );
};

LanguagePanel.propTypes = {
  t: PropTypes.func.isRequired,
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
