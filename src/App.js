import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import HeaderPanel from "./components/HeaderPanel/HeaderPanel.jsx";
import SidePanel from "./components/SidePanel/SidePanel.jsx";
import ContentPanel from "./components/ContentPanel/ContentPanel.jsx";

class App extends Component {
  state = {
    openConfessionModal: false,
    activeHeaderMenuItem: "",
    activeMenuItem: ""
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

  handleMenuItemClick = (e, { name }) => {
    this.setState({ activeMenuItem: name });
  };

  render() {
    const {
      openConfessionModal,
      activeHeaderMenuItem,
      activeMenuItem
    } = this.state;

    return (
      <Grid>
        <Grid.Row>
          <HeaderPanel
            openConfessionModal={openConfessionModal}
            activeHeaderMenuItem={activeHeaderMenuItem}
            handleHeaderMenuItemClick={this.handleHeaderMenuItemClick}
          />
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={3}>
            <SidePanel
              activeItem={activeMenuItem}
              handleMenuItemClick={this.handleMenuItemClick}
            />
          </Grid.Column>
          <Grid.Column width={12}>
            <ContentPanel />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
