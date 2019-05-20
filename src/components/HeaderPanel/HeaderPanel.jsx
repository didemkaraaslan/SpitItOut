import React, { Component } from "react";
import PropTypes from "prop-types";
import faker from "faker";
import {
  Container,
  Menu,
  Icon,
  Input,
  Image,
  Header,
  Dropdown
} from "semantic-ui-react";

import ConfessionModal from "../ContentPanel/ConfessionModal.jsx";
import logo from "../../logo.png";

const trigger = (
  <span>
    <Image avatar src={faker.internet.avatar()} /> {faker.name.findName()}
  </span>
);

const options = [
  { key: "user", text: "Account", icon: "user" },
  { key: "settings", text: "Settings", icon: "settings" },
  { key: "sign-out", text: "Sign Out", icon: "sign out" }
];

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

  render() {
    const { openConfessionModal, activeHeaderMenuItem } = this.state;
    const { firebase, profile } = this.props;

    return (
      <Container>
        <Menu stackable fixed="top" fluid tabular inverted position="right">
          <Menu.Item as="a">
            <Header as="h2" color="violet">
              <Image src={logo} size="medium" alt="app_logo" />
              Spit It Out!
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
              <Dropdown
                trigger={trigger}
                options={options}
                pointing="top right"
                icon={null}
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <ConfessionModal
          open={openConfessionModal}
          profile={profile}
          firebase={firebase}
          handleCloseConfessionModal={this.handleCloseConfessionModal}
        />
      </Container>
    );
  }
}

HeaderPanel.propTypes = {
  profile: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired
};

export default HeaderPanel;
