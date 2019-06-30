import React, { useState } from "react";
import PropTypes from "prop-types";

import * as Settings from "../../utils/Settings";
import ThemePanel from "../SettingsPanel/Theme/ThemePanel.jsx";
import LanguagePanel from "../SettingsPanel/Language/LanguagePanel.jsx";
import { Container, Modal, Grid, Menu } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

const SettingsPanel = ({ firebase, profile, open, handleCloseSettings }) => {
  const [activePreference, setActivePreference] = useState(
    Settings.Notifications
  );

  const { t } = useTranslation();

  const renderRelatedSetting = activePreference => {
    const currentUser = firebase.auth().currentUser;

    switch (activePreference) {
      case Settings.Notifications:
        return null;
      case Settings.LanguageAndRegion:
        return <LanguagePanel currentUser={currentUser} />;
      case Settings.Theme:
        return <ThemePanel currentUser={currentUser} />;
    }
  };

  console.log(activePreference);

  return (
    <Container style={{ marginTop: "50px" }}>
      <Modal
        size="fullscreen"
        open={open}
        onClose={handleCloseSettings}
        closeIcon
      >
        <Modal.Header>{t("settings.adjustPreferences")}</Modal.Header>
        <Modal.Content>
          <Grid>
            <Grid.Column width={4}>
              <Menu fluid vertical tabular>
                <Menu.Item
                  name={t(`settings.${Settings.Notifications}`)}
                  active={activePreference === Settings.Notifications}
                  onClick={(e, { name }) =>
                    setActivePreference(Settings.Notifications)
                  }
                />
                <Menu.Item
                  name={t(`settings.${Settings.LanguageAndRegion}`)}
                  active={activePreference === Settings.LanguageAndRegion}
                  onClick={(e, { name }) =>
                    setActivePreference(Settings.LanguageAndRegion)
                  }
                />
                <Menu.Item
                  name={t(`settings.${Settings.Theme}`)}
                  active={activePreference === Settings.Theme}
                  onClick={(e, { name }) => setActivePreference(Settings.Theme)}
                />
                <Menu.Item
                  name={t(`settings.${Settings.Advanced}`)}
                  active={activePreference === Settings.Advanced}
                  onClick={(e, { name }) =>
                    setActivePreference(Settings.Advanced)
                  }
                />
              </Menu>
            </Grid.Column>

            <Grid.Column stretched width={12} textAlign="center">
              {renderRelatedSetting(activePreference)}
            </Grid.Column>
          </Grid>
        </Modal.Content>
      </Modal>
    </Container>
  );
};

SettingsPanel.propTypes = {
  t: PropTypes.func,
  firebase: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleCloseSettings: PropTypes.func.isRequired
};

export default SettingsPanel;
