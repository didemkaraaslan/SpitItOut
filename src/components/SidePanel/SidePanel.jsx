import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";

import * as Tag from "../../utils/Tags";
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
          name={Tag.ALL}
          as="a"
          icon="hashtag"
          active={activeItem === Tag.ALL}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name={Tag.REGRET}
          as="a"
          icon="hashtag"
          active={activeItem === Tag.REGRET}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name={Tag.FIRST_EXPERIENCE}
          as="a"
          icon="hashtag"
          active={activeItem === Tag.FIRST_EXPERIENCE}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name={Tag.SAD}
          as="a"
          icon="hashtag"
          active={activeItem === Tag.SAD}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name={Tag.GUILTY}
          as="a"
          icon="hashtag"
          active={activeItem === Tag.GUILTY}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name={Tag.LOVE}
          as="a"
          icon="hashtag"
          active={activeItem === Tag.LOVE}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name={Tag.HAPPY}
          as="a"
          icon="hashtag"
          active={activeItem === Tag.HAPPY}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name={Tag.CONGRATULATIONS}
          as="a"
          icon="hashtag"
          active={activeItem === Tag.CONGRATULATIONS}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name={Tag.DEPRESSION}
          as="a"
          icon="hashtag"
          active={activeItem === Tag.DEPRESSION}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name={Tag.CHEATING}
          as="a"
          icon="hashtag"
          active={activeItem === Tag.CHEATING}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name={Tag.MOCKING}
          as="a"
          icon="hashtag"
          active={activeItem === Tag.MOCKING}
          onClick={handleMenuItemClick}
        />
        <Menu.Item
          name={Tag.SEXUAL_ABUSE}
          as="a"
          icon="hashtag"
          active={activeItem === Tag.SEXUAL_ABUSE}
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
