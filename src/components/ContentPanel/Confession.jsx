import React from "react";
import PropTypes from "prop-types";
import { Feed, Segment, Label, Icon, Image } from "semantic-ui-react";

const Confession = ({ confession }) => (
  <Segment style={{ maxWidth: "600px", minHeight: "120px" }} raised>
    <Feed style={{ fontSize: "13px" }}>
      <Feed.Event>
        <Feed.Label>
          <Image src={confession.user.photoURL} avatar alt="user avatar" />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{confession.user.username}</Feed.User>
          </Feed.Summary>
          <Label as="a" attached="top right" color="orange" tag>
            {confession.tag}
          </Label>
          <Feed.Extra>{confession.content}</Feed.Extra>
          <Feed.Meta>
            <Feed.Like>
              <Icon name="like" /> {confession.likes}
            </Feed.Like>
            <Feed.Like>
              <Icon name="comment" /> {confession.comments}
            </Feed.Like>
            <Feed.Like>
              <Icon name="eye" /> {confession.views}
            </Feed.Like>
          </Feed.Meta>
          <Feed.Date style={{ float: "right", marginTop: "4px" }}>
            {confession.timestamp}
          </Feed.Date>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  </Segment>
);

Confession.propTypes = {
  confession: PropTypes.object
};

export default Confession;