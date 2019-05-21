import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Feed, Segment, Label, Icon, Image } from "semantic-ui-react";

import { pickTagColor } from "../../utils/functions";

const Confession = ({ confession }) => (
  <Segment
    style={{ maxWidth: "600px", minHeight: "120px" }}
    loading={!confession}
    raised
  >
    <Feed.Event>
      <Feed.Label>
        <Image
          src={confession && confession.user.photoURL}
          avatar
          alt="user avatar"
        />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>{confession && confession.user.username}</Feed.User>
        </Feed.Summary>
        <Label
          as="a"
          attached="top right"
          color={pickTagColor(confession && confession.tag)}
          tag
        >
          {confession && confession.tag}
        </Label>
        <Feed.Extra>{confession && confession.content}</Feed.Extra>
        <Feed.Meta>
          <Feed.Like>
            <Icon name="like" /> {confession && confession.numberOfLikes}
          </Feed.Like>
          <Feed.Like>
            <Icon name="comment" /> {confession && confession.numberOfComments}
          </Feed.Like>
          <Feed.Like>
            <Icon name="eye" /> {confession && confession.numberOfViews}
          </Feed.Like>
        </Feed.Meta>
        <Feed.Date style={{ float: "right", marginTop: "4px" }}>
          {moment(confession && confession.timestamp).fromNow()}
        </Feed.Date>
      </Feed.Content>
    </Feed.Event>
  </Segment>
);

Confession.propTypes = {
  confession: PropTypes.object
};

export default Confession;
