import React from "react";
import PropTypes from "prop-types";

import Confession from "../ContentPanel/Confession.jsx";

const Favorites = ({
  currentUser,
  confessions,
  handleLike,
  handleDislike,
  addFavorite
}) => {
  const currentUserUid = currentUser.uid;
  return confessions
    .filter(
      ({ key, value }) =>
        value.favorites.hasOwnProperty(currentUserUid) &&
        value.favorites[currentUserUid] === 1
    )
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

Favorites.propTypes = {
  currentUser: PropTypes.object.isRequired,
  confessions: PropTypes.array.isRequired
};

export default Favorites;
