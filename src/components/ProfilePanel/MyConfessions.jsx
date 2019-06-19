import React from "react";
import PropTypes from "prop-types";

import Confession from "../ContentPanel/Confession.jsx";

const MyConfessions = ({
  currentUser,
  confessions,
  handleLike,
  handleDislike,
  addFavorite
}) => {
  return confessions
    .filter(({ key, value }) => value.user.uid === currentUser.uid)
    .map(({ key, value }) => (
      <Confession
        key={key}
        currentUserUid={currentUser.uid}
        confession={value}
        confessionId={key}
        handleLike={handleLike}
        handleDislike={handleDislike}
        addFavorite={addFavorite}
      />
    ));
};

MyConfessions.propTypes = {
  currentUser: PropTypes.object.isRequired,
  confessions: PropTypes.array.isRequired
};

export default MyConfessions;
