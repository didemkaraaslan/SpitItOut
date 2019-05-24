import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";

import { setCategoryFilter } from "../../actions/confessionActions";
import * as Tag from "../../utils/Tags";
import "../../app.css";

class SidePanel extends Component {
  handleMenuItemClick = (e, { name }) => {
    this.props.setCategoryFilter(name);
  };

  render() {
    const { filterCategory } = this.props;
    return (
      <Menu
        size="large"
        vertical
        fixed="top"
        style={{
          marginTop: "70px",
          fontSize: "1.1rem"
        }}
      >
        <Menu.Item>
          <Menu.Header>Categories</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name={Tag.ALL}
              as="a"
              icon="hashtag"
              active={filterCategory === Tag.ALL}
              onClick={this.handleMenuItemClick}
            />
            <Menu.Item
              name={Tag.REGRET}
              as="a"
              icon="hashtag"
              active={filterCategory === Tag.REGRET}
              onClick={this.handleMenuItemClick}
            />
            <Menu.Item
              name={Tag.FIRST_EXPERIENCE}
              as="a"
              icon="hashtag"
              active={filterCategory === Tag.FIRST_EXPERIENCE}
              onClick={this.handleMenuItemClick}
            />
            <Menu.Item
              name={Tag.SAD}
              as="a"
              icon="hashtag"
              active={filterCategory === Tag.SAD}
              onClick={this.handleMenuItemClick}
            />
            <Menu.Item
              name={Tag.GUILTY}
              as="a"
              icon="hashtag"
              active={filterCategory === Tag.GUILTY}
              onClick={this.handleMenuItemClick}
            />
            <Menu.Item
              name={Tag.LOVE}
              as="a"
              icon="hashtag"
              active={filterCategory === Tag.LOVE}
              onClick={this.handleMenuItemClick}
            />
            <Menu.Item
              name={Tag.HAPPY}
              as="a"
              icon="hashtag"
              active={filterCategory === Tag.HAPPY}
              onClick={this.handleMenuItemClick}
            />
            <Menu.Item
              name={Tag.CONGRATULATIONS}
              as="a"
              icon="hashtag"
              active={filterCategory === Tag.CONGRATULATIONS}
              onClick={this.handleMenuItemClick}
            />
            <Menu.Item
              name={Tag.DEPRESSION}
              as="a"
              icon="hashtag"
              active={filterCategory === Tag.DEPRESSION}
              onClick={this.handleMenuItemClick}
            />
            <Menu.Item
              name={Tag.CHEATING}
              as="a"
              icon="hashtag"
              active={filterCategory === Tag.CHEATING}
              onClick={this.handleMenuItemClick}
            />
            <Menu.Item
              name={Tag.MOCKING}
              as="a"
              icon="hashtag"
              active={filterCategory === Tag.MOCKING}
              onClick={this.handleMenuItemClick}
            />
            <Menu.Item
              name={Tag.SEXUAL_ABUSE}
              as="a"
              icon="hashtag"
              active={filterCategory === Tag.SEXUAL_ABUSE}
              onClick={this.handleMenuItemClick}
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Also filter by</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name={Tag.LATEST}
              as="a"
              active={filterCategory === Tag.LATEST}
              onClick={this.handleMenuItemClick}
            />
            <Menu.Item
              name={Tag.MOST_TRENDING}
              as="a"
              active={filterCategory === Tag.MOST_TRENDING}
              onClick={this.handleMenuItemClick}
            />
            <Menu.Item
              name={Tag.MOST_APPROVED}
              as="a"
              active={filterCategory === Tag.MOST_APPROVED}
              onClick={this.handleMenuItemClick}
            />
            <Menu.Item
              name={Tag.MOST_JUDGED}
              as="a"
              active={filterCategory === Tag.MOST_JUDGED}
              onClick={this.handleMenuItemClick}
            />
            <Menu.Item
              name={Tag.MOST_COMMENTED}
              as="a"
              active={filterCategory === Tag.MOST_COMMENTED}
              onClick={this.handleMenuItemClick}
            />
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    );
  }
}

SidePanel.propTypes = {
  filterCategory: PropTypes.string.isRequired,
  setCategoryFilter: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  setCategoryFilter: category => dispatch(setCategoryFilter(category))
});

export default connect(
  null,
  mapDispatchToProps
)(SidePanel);
