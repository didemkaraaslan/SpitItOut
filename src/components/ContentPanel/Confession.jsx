import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Comment, Feed, Segment, Label, Icon, Image } from "semantic-ui-react";

import { pickTagColor } from "../../utils/functions";

const Confession = ({ confession }) => (
  <Segment loading={!confession} raised>
    <Comment.Group>
      <Comment>
        <Comment.Avatar as="a" src={confession && confession.user.photoURL} />
        <Comment.Content>
          <Comment.Author as="a">
            {confession && confession.user.username}
          </Comment.Author>
          <Comment.Metadata>
            <span>{moment(confession && confession.timestamp).fromNow()}</span>
          </Comment.Metadata>
          <Comment.Text>{confession && confession.content}</Comment.Text>
          <Comment.Actions>
            <Comment.Action>
              <Icon name="like" />
              {confession && confession.numberOfLikes}
            </Comment.Action>
            <Comment.Action>
              <Icon name="comment" />
              {confession && confession.numberOfComments}
            </Comment.Action>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
      <Label
        as="a"
        color={confession && pickTagColor(confession.tag)}
        size="small"
        attached="top right"
      >
        <Icon name="hashtag" />
        {confession && confession.tag}
      </Label>
    </Comment.Group>
  </Segment>
);

Confession.propTypes = {
  confession: PropTypes.object
};

export default Confession;
