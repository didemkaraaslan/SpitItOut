import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect, getVal, isLoaded } from "react-redux-firebase";
import { Menu, Dimmer, Loader } from "semantic-ui-react";
import { withTranslation } from "react-i18next";

import { setCategoryFilter } from "../../actions/confessionActions";
import * as Tag from "../../utils/Tags";
import { themes } from "../../utils/Theme";
import "../../app.css";

class SidePanel extends Component {
  handleMenuItemClick = (name, event) => {
    event.preventDefault();
    this.props.setCategoryFilter(name);
  };
  render() {
    const { t, filterCategory, activeTheme } = this.props;
    const { inverted, color } = isLoaded(activeTheme) && themes[activeTheme];
    return (
      <React.Fragment>
        {isLoaded(activeTheme) ? (
          <Menu
            size="large"
            vertical
            inverted={inverted}
            fixed="top"
            color={color}
            style={{
              marginTop: "55px",
              fontSize: "1.1rem"
            }}
          >
            <Menu.Item>
              <Menu.Header>{t("categories.categories")}</Menu.Header>
              <Menu.Menu>
                <Menu.Item
                  name={t(`categories.${Tag.ALL}`)}
                  as="a"
                  icon="hashtag"
                  active={filterCategory === Tag.ALL}
                  onClick={event => {
                    this.handleMenuItemClick(Tag.ALL, event);
                  }}
                />
                <Menu.Item
                  name={t(`categories.${Tag.REGRET}`)}
                  as="a"
                  icon="hashtag"
                  active={filterCategory === Tag.REGRET}
                  onClick={event => {
                    this.handleMenuItemClick(Tag.REGRET, event);
                  }}
                />
                <Menu.Item
                  name={t(`categories.${Tag.FIRST_EXPERIENCE}`)}
                  as="a"
                  icon="hashtag"
                  active={filterCategory === Tag.FIRST_EXPERIENCE}
                  onClick={event => {
                    this.handleMenuItemClick(Tag.FIRST_EXPERIENCE, event);
                  }}
                />
                <Menu.Item
                  name={t(`categories.${Tag.SAD}`)}
                  as="a"
                  icon="hashtag"
                  active={filterCategory === Tag.SAD}
                  onClick={event => {
                    this.handleMenuItemClick(Tag.SAD, event);
                  }}
                />
                <Menu.Item
                  name={t(`categories.${Tag.GUILTY}`)}
                  as="a"
                  icon="hashtag"
                  active={filterCategory === Tag.GUILTY}
                  onClick={event => {
                    this.handleMenuItemClick(Tag.GUILTY, event);
                  }}
                />
                <Menu.Item
                  name={t(`categories.${Tag.LOVE}`)}
                  as="a"
                  icon="hashtag"
                  active={filterCategory === Tag.LOVE}
                  onClick={event => {
                    this.handleMenuItemClick(Tag.LOVE, event);
                  }}
                />
                <Menu.Item
                  name={t(`categories.${Tag.HAPPY}`)}
                  as="a"
                  icon="hashtag"
                  active={filterCategory === Tag.HAPPY}
                  onClick={event => {
                    this.handleMenuItemClick(Tag.HAPPY, event);
                  }}
                />
                <Menu.Item
                  name={t(`categories.${Tag.CONGRATULATIONS}`)}
                  as="a"
                  icon="hashtag"
                  active={filterCategory === Tag.CONGRATULATIONS}
                  onClick={event => {
                    this.handleMenuItemClick(Tag.CONGRATULATIONS, event);
                  }}
                />
                <Menu.Item
                  name={t(`categories.${Tag.DEPRESSION}`)}
                  as="a"
                  icon="hashtag"
                  active={filterCategory === Tag.DEPRESSION}
                  onClick={event => {
                    this.handleMenuItemClick(Tag.DEPRESSION, event);
                  }}
                />
                <Menu.Item
                  name={t(`categories.${Tag.CHEATING}`)}
                  as="a"
                  icon="hashtag"
                  active={filterCategory === Tag.CHEATING}
                  onClick={event => {
                    this.handleMenuItemClick(Tag.CHEATING, event);
                  }}
                />
                <Menu.Item
                  name={t(`categories.${Tag.MOCKING}`)}
                  as="a"
                  icon="hashtag"
                  active={filterCategory === Tag.MOCKING}
                  onClick={event => {
                    this.handleMenuItemClick(Tag.MOCKING, event);
                  }}
                />
                <Menu.Item
                  name={t(`categories.${Tag.SEXUAL_ABUSE}`)}
                  as="a"
                  icon="hashtag"
                  active={filterCategory === Tag.SEXUAL_ABUSE}
                  onClick={event => {
                    this.handleMenuItemClick(Tag.SEXUAL_ABUSE, event);
                  }}
                />
              </Menu.Menu>
            </Menu.Item>

            <Menu.Item>
              <Menu.Header>{t("categories.alsoFilterBy")}</Menu.Header>

              <Menu.Menu>
                <Menu.Item
                  name={t(`categories.${Tag.LATEST}`)}
                  as="a"
                  active={filterCategory === Tag.LATEST}
                  onClick={event => {
                    this.handleMenuItemClick(Tag.LATEST, event);
                  }}
                />
                <Menu.Item
                  name={t(`categories.${Tag.MOST_TRENDING}`)}
                  as="a"
                  active={filterCategory === Tag.MOST_TRENDING}
                  onClick={event => {
                    this.handleMenuItemClick(Tag.MOST_TRENDING, event);
                  }}
                />
                <Menu.Item
                  name={t(`categories.${Tag.MOST_APPROVED}`)}
                  as="a"
                  active={filterCategory === Tag.MOST_APPROVED}
                  onClick={event => {
                    this.handleMenuItemClick(Tag.MOST_APPROVED, event);
                  }}
                />
                <Menu.Item
                  name={t(`categories.${Tag.MOST_JUDGED}`)}
                  as="a"
                  active={filterCategory === Tag.MOST_JUDGED}
                  onClick={event => {
                    this.handleMenuItemClick(Tag.MOST_JUDGED, event);
                  }}
                />
                <Menu.Item
                  name={t(`categories.${Tag.MOST_COMMENTED}`)}
                  as="a"
                  active={filterCategory === Tag.MOST_COMMENTED}
                  onClick={event => {
                    this.handleMenuItemClick(Tag.MOST_COMMENTED, event);
                  }}
                />
              </Menu.Menu>
            </Menu.Item>
          </Menu>
        ) : (
          <Menu
            size="large"
            vertical
            fixed="top"
            style={{
              marginTop: "70px",
              fontSize: "1.1rem"
            }}
          >
            <Dimmer active inverted>
              <Loader inverted />
            </Dimmer>
          </Menu>
        )}
      </React.Fragment>
    );
  }
}

SidePanel.propTypes = {
  t: PropTypes.func.isRequired,
  filterCategory: PropTypes.string.isRequired,
  setCategoryFilter: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  activeTheme: PropTypes.string
};

const mapStateToProps = ({ firebase }, props) => ({
  activeTheme: getVal(
    firebase,
    `data/users/${props.currentUser.uid}/prefs/theme/activeTheme`
  )
});

const mapDispatchToProps = dispatch => ({
  setCategoryFilter: category => dispatch(setCategoryFilter(category))
});

export default compose(
  withTranslation(),
  firebaseConnect(props => {
    return [`users/${props.currentUser.uid}/prefs/theme/activeTheme`];
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SidePanel);
