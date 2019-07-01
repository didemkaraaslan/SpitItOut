import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Comment, Divider, Segment, Label, Icon } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

import CommentPanel from "../CommentPanel/CommentPanel";
import { setCategoryFilter } from "../../actions/confessionActions";
import { pickTagColor } from "../../utils/functions";
import femaleAvatar from "../../assets/img/female_avatar.png";
import maleAvatar from "../../assets/img/male_avatar.png";

const getUserAvatar = confession => {
  const gender = confession.user.gender;
  if (confession.shareAs === "user") {
    const avatar = gender === "female" ? femaleAvatar : maleAvatar;
    return (
      <Comment.Avatar
        src={confession.user.photoURL ? confession.user.photoURL : avatar}
        className="confession__avatar"
      />
    );
  } else {
    const avatar = gender === "female" ? femaleAvatar : maleAvatar;
    return <Comment.Avatar src={avatar} className="confession__avatar" />;
  }
};

const Confession = ({
  currentUser,
  currentUserUid,
  confession,
  confessionId,
  handleLike,
  handleDislike,
  addFavorite,
  postComment,
  setCategoryFilter
}) => {
  const [commentsVisible, setCommentsVisibility] = useState(false);
  const { t } = useTranslation();

  return (
    <Segment loading={!confession} raised>
      <Comment.Group size="small">
        <Comment>
          {confession && getUserAvatar(confession)}
          <Comment.Content>
            {confession && confession.shareAs === "user" ? (
              <Comment.Author as="a">
                {confession && confession.user.username}
              </Comment.Author>
            ) : (
              <Comment.Author>{t("confession.anonymous")}</Comment.Author>
            )}
            <Comment.Metadata>
              <span>
                {moment(confession && confession.timestamp).fromNow()}
              </span>
            </Comment.Metadata>
            <span style={{ position: "absolute", right: "3px" }}>
              <Icon
                name={
                  confession &&
                  confession.favorites &&
                  confession.favorites[currentUserUid] === 1
                    ? "heart"
                    : "heart outline"
                }
                onClick={e => addFavorite(confession, confessionId)}
              />
            </span>
            <Comment.Text>{confession && confession.content}</Comment.Text>
            {confession &&
              confession.tags.map((prop, key) => (
                <Label
                  key={key}
                  as="a"
                  basic
                  size="tiny"
                  color={pickTagColor(prop)}
                  onClick={(event, data) => setCategoryFilter(prop)}
                >
                  <span>{t(`categories.${prop}`)}</span>
                </Label>
              ))}
            <Divider />
            <Comment.Actions>
              <Comment.Action>
                <Icon
                  name={
                    confession &&
                    confession.feelings &&
                    confession.feelings[currentUserUid] === 1
                      ? "thumbs up"
                      : "thumbs up outline"
                  }
                  onClick={e => handleLike(confession, confessionId)}
                />
                {confession && confession.numberOfLikes}
              </Comment.Action>{" "}
              <Comment.Action>
                <Icon
                  name={
                    confession &&
                    confession.feelings &&
                    confession.feelings[currentUserUid] === -1
                      ? "thumbs down"
                      : "thumbs down outline"
                  }
                  onClick={e => handleDislike(confession, confessionId)}
                />
                {confession && confession.numberOfDislikes}
              </Comment.Action>{" "}
              <Comment.Action>
                <Icon
                  name="comment"
                  onClick={() => setCommentsVisibility(!commentsVisible)}
                />{" "}
                {confession && confession.numberOfComments}
              </Comment.Action>
              <Comment.Action
                as="a"
                style={{ float: "right" }}
                onClick={() => setCommentsVisibility(!commentsVisible)}
              >
                {t("confession.reply")}
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>

      {/* Comment Panel */
      commentsVisible && (
        <CommentPanel
          currentUser={currentUser}
          confession={confession}
          confessionId={confessionId}
          postComment={postComment}
        />
      )}
    </Segment>
  );
};

Confession.propTypes = {
  t: PropTypes.func,
  currentUser: PropTypes.object,
  currentUserUid: PropTypes.string,
  confessionId: PropTypes.string,
  gender: PropTypes.string,
  confession: PropTypes.object,
  handleLike: PropTypes.func,
  handleDislike: PropTypes.func,
  addFavorite: PropTypes.func,
  postComment: PropTypes.func,
  setCategoryFilter: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  setCategoryFilter: category => dispatch(setCategoryFilter(category))
});

export default connect(
  null,
  mapDispatchToProps
)(Confession);
