import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";

import "../../app.css";

const SidePanel = ({ activeItem, handleMenuItemClick }) => (
  <Menu
    size="large"
    vertical
    style={{
      marginTop: "26px",
      fontSize: "1.1rem",
      minHeight: "600px",
      maxWidth: "198px"
    }}
  >
    <Menu.Item>
      <Menu.Header>Categories</Menu.Header>

      <Menu.Menu>
        <Menu.Item
          name="All"
          as="a"
          icon="hashtag"
          active={activeItem === "All"}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name="Regret"
          as="a"
          icon="hashtag"
          active={activeItem === "Regret"}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name="First experience"
          as="a"
          icon="hashtag"
          active={activeItem === "First experience"}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name="Sad"
          as="a"
          icon="hashtag"
          active={activeItem === "Sad"}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name="Guilty"
          as="a"
          icon="hashtag"
          active={activeItem === "Guilty"}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name="Love"
          as="a"
          icon="hashtag"
          active={activeItem === "Love"}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name="Happy"
          as="a"
          icon="hashtag"
          active={activeItem === "Happy"}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name="Congratulations"
          as="a"
          icon="hashtag"
          active={activeItem === "Congratulations"}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name="Depression"
          as="a"
          icon="hashtag"
          active={activeItem === "Depression"}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name="Cheating"
          as="a"
          icon="hashtag"
          active={activeItem === "Cheating"}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name="Mocking"
          as="a"
          icon="hashtag"
          active={activeItem === "Mocking"}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name="Sexual Abuse"
          as="a"
          icon="hashtag"
          active={activeItem === "Sexual Abuse"}
          onClick={handleMenuItemClick}
        />
      </Menu.Menu>
    </Menu.Item>

    <Menu.Item>
      <Menu.Header>Most Popular</Menu.Header>

      <Menu.Menu>
        <Menu.Item name="enterprise" active={activeItem === "enterprise"} />
        <Menu.Item name="consumer" active={activeItem === "consumer"} />
      </Menu.Menu>
    </Menu.Item>
  </Menu>
);

SidePanel.propTypes = {
  activeItem: PropTypes.string,
  handleMenuItemClick: PropTypes.func
};

export default SidePanel;
