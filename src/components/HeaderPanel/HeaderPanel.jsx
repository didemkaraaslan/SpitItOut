import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, getVal, isLoaded } from "react-redux-firebase";
import { themes } from "../../utils/Theme";
import {
  Menu,
  Icon,
  Input,
  Image,
  Header,
  Dropdown,
  Dimmer,
  Loader
} from "semantic-ui-react";

import ConfessionModal from "../ContentPanel/ConfessionModal.jsx";
import logo from "../../assets/img/logo.png";

class HeaderPanel extends Component {
  state = {
    openConfessionModal: false,
    activeHeaderMenuItem: "ff"
  };

  handleHeaderMenuItemClick = (e, { name }) => {
    let { openConfessionModal } = this.state;

    if (name === "make_confession") {
      openConfessionModal = true;
    } else {
      openConfessionModal = false;
    }
    this.setState({ openConfessionModal, activeHeaderMenuItem: name });
  };

  handleCloseConfessionModal = () => {
    this.setState({ openConfessionModal: false });
  };

  handleSignOut = () => this.props.firebase.auth().signOut();

  render() {
    const { openConfessionModal, activeHeaderMenuItem } = this.state;
    const { activeTheme, currentUser, firebase, profile } = this.props;

    const { inverted, color } = isLoaded(activeTheme) && themes[activeTheme];

    const trigger = (
      <span>
        <Image avatar src={currentUser.photoURL} /> {currentUser.displayName}
      </span>
    );

    return (
      <React.Fragment>
        {isLoaded(activeTheme) ? (
          <Menu
            stackable
            fixed="top"
            fluid
            tabular
            inverted
            color={color}
            position="right"
          >
            <Menu.Item as="a">
              <Header as="h2" color="black">
                <Image src={logo} size="medium" alt="app_logo" />
                SpitItOut
              </Header>
            </Menu.Item>

            <Menu.Item
              name="features"
              active={activeHeaderMenuItem === "features"}
              onClick={this.handleHeaderMenuItemClick}
            >
              Features
            </Menu.Item>

            <Menu.Item name="search">
              <Input
                className="icon"
                icon="search"
                placeholder="Search for Users, Tags.."
              />
            </Menu.Item>

            <Menu.Menu position="right">
              <Menu.Item
                name="make_confession"
                onClick={this.handleHeaderMenuItemClick}
              >
                <Icon name="pencil" /> Make a confession
              </Menu.Item>

              <Menu.Item
                name="sign-in"
                active={activeHeaderMenuItem === "sign-in"}
                onClick={this.handleHeaderMenuItemClick}
              >
                <Dropdown trigger={trigger} pointing="top right" icon={null}>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      key="user"
                      icon="user"
                      text="Profile"
                      onClick={this.props.handleOpenUserProfile}
                    />
                    <Dropdown.Item
                      key="settings"
                      icon="settings"
                      text="Settings"
                      onClick={this.props.handleOpenSettings}
                    />
                    <Dropdown.Item
                      key="signout"
                      icon="sign out"
                      text="Log out"
                      onClick={this.handleSignOut}
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        ) : (
          <Menu stackable fixed="top" fluid tabular position="right">
            <Dimmer active inverted>
              <Loader inverted />
            </Dimmer>
          </Menu>
        )}
        <ConfessionModal
          open={openConfessionModal}
          profile={profile}
          firebase={firebase}
          currentUser={currentUser}
          handleCloseConfessionModal={this.handleCloseConfessionModal}
        />
      </React.Fragment>
    );
  }
}

HeaderPanel.propTypes = {
  profile: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  handleOpenSettings: PropTypes.func.isRequired,
  handleOpenUserProfile: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  activeTheme: PropTypes.string
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
)(HeaderPanel);
