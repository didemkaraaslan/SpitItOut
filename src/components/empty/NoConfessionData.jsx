import React from "react";
import PropTypes from "prop-types";
import { Message, Image, Header, Label } from "semantic-ui-react";
import { pickTagColor } from "../../utils/functions";

import Crying from "../../assets/img/cryingcircle.png";

const NoConfessionData = ({ filterCategory }) => (
  <Message style={{ textAlign: "center", borderRadius: "5px" }}>
    <Image
      src={Crying}
      alt="Crying image"
      size="small"
      verticalAlign="middle"
    />
    <Header as="h2">
      Ooops!
      <Header.Subheader>
        <Label basic size="small" color={pickTagColor(filterCategory)}>
          #{filterCategory}
        </Label>{" "} { " " }
        currently has no confession posted
      </Header.Subheader>
    </Header>
  </Message>
);

NoConfessionData.propTypes = {
  filterCategory: PropTypes.string.isRequired
};

export default NoConfessionData;
