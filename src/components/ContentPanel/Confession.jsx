import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Comment, Divider, Segment, Label, Icon } from "semantic-ui-react";

import { pickTagColor } from "../../utils/functions";

const Confession = ({
  currentUserUid,
  confession,
  confessionId,
  handleLike,
  handleDislike
}) => (
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
              <Icon name="comment" />{" "}
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
  currentUserUid: PropTypes.string,
  confessionId: PropTypes.string,
  confession: PropTypes.object,
  handleLike: PropTypes.func,
  handleDislike: PropTypes.func
};

export default Confession;
