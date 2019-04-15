import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import HeaderPanel from "./components/HeaderPanel/HeaderPanel.jsx";
import SidePanel from "./components/SidePanel/SidePanel.jsx";

class App extends Component {
  state = {
    activeHeaderMenuItem: "",
    activeMenuItem: ""
  };

  handleHeaderMenuItemClick = (e, { name }) => {
    this.setState({ activeHeaderMenuItem: name });
  };

  handleMenuItemClick = (e, { name }) => {
    this.setState({ activeMenuItem: name });
  };

  render() {
    const { activeHeaderMenuItem, activeMenuItem } = this.state;

    return (
      <Grid>
        <Grid.Column width={16}>
          <HeaderPanel
            activeHeaderMenuItem={activeHeaderMenuItem}
            handleHeaderMenuItemClick={this.handleHeaderMenuItemClick}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <SidePanel
            activeItem={activeMenuItem}
            handleMenuItemClick={this.handleMenuItemClick}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
