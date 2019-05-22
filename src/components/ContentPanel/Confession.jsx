import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Comment,
  Feed,
  Divider,
  Segment,
  Label,
  Icon,
  Image
} from "semantic-ui-react";

import { pickTagColor } from "../../utils/functions";

const Confession = ({ confession }) => (
  <Segment loading={!confession} raised>
    <Comment.Group size="small">
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
          <Label
            as="a"
            basic
            size="tiny"
            color={confession && pickTagColor(confession.tag)}
          >
            <span>{confession && confession.tag}</span>
          </Label>
          <Divider />
          <Comment.Actions>
            <Comment.Action>
              <Icon name="like" />
              {confession && confession.numberOfLikes}
            </Comment.Action>
            <Comment.Action>
              <Icon name="comment" />
              {confession && confession.numberOfComments}
            </Comment.Action>
            <Comment.Action style={{ float: "right" }}>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    </Comment.Group>
  </Segment>
);

Confession.propTypes = {
  confession: PropTypes.object
};

export default Confession;
