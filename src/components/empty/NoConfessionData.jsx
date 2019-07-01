import React from "react";
import PropTypes from "prop-types";
import { Message, Image, Header, Label } from "semantic-ui-react";
import { pickTagColor } from "../../utils/functions";
import { useTranslation } from "react-i18next";

import Crying from "../../assets/img/cryingcircle.png";

const NoConfessionData = ({ filterCategory }) => {
  const { t } = useTranslation();
  return (
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
            #{t(`categories.${filterCategory}`)}
          </Label>{" "}
          {t("empty.noConfessionData")}
        </Header.Subheader>
      </Header>
    </Message>
  );
};

NoConfessionData.propTypes = {
  filterCategory: PropTypes.string.isRequired
};

export default NoConfessionData;
