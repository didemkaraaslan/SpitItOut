import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  firebaseConnect,
  getVal,
  isLoaded,
  isEmpty
} from "react-redux-firebase";
import { Header, Form, Button, Comment } from "semantic-ui-react";

const CommentPanel = ({
  currentUser,
  confession,
  confessionId,
  comments,
  postComment
}) => {
  const [content, setContent] = useState(" ");
  const [replyCommentId, setReplyCommentId] = useState("");

  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>

      {comments &&
        comments.map(({ key, value }) => (
          <Comment key={key}>
            <Comment.Avatar src={value.photoURL} />
            <Comment.Content>
              <Comment.Author as="a">{value.author}</Comment.Author>
              <Comment.Metadata>
                <div>{moment(value.timestamp).fromNow()}</div>
              </Comment.Metadata>
              <Comment.Text>{value.content}</Comment.Text>
              <Comment.Actions>
                <Comment.Action
                  onClick={() => {
                    setReplyCommentId(key);
                    setContent(`@${value.author}`);
                  }}
                >
                  Reply
                </Comment.Action>
              </Comment.Actions>
            </Comment.Content>
            <Comment.Group>
              {value.replies &&
                Object.keys(value.replies).map((key, i) => (
                  <Comment key={i}>
                    <Comment.Avatar src={value.replies[key].photoURL} />
                    <Comment.Content>
                      <Comment.Author as="a">
                        {value.replies[key].author}
                      </Comment.Author>
                      <Comment.Metadata>
                        <div>
                          moment(value.replies[key].timestamp).fromNow()
                        </div>
                      </Comment.Metadata>
                      <Comment.Text>{value.replies[key].content}</Comment.Text>
                    </Comment.Content>
                  </Comment>
                ))}
            </Comment.Group>
          </Comment>
        ))}

      <Form className="commentForm">
        <Form.Group inline className="commentContainer">
          <Form.TextArea
            rows={1}
            placeholder="Add a comment..."
            className="commentTextarea"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <Button
            content="Post"
            className="commentSendButton"
            secondary
            onClick={() => {
              setContent(" ");
              setReplyCommentId("");
              postComment(confession, confessionId, replyCommentId, {
                author: currentUser.displayName,
                photoURL: currentUser.photoURL,
                content
              });
            }}
          />
        </Form.Group>
      </Form>
    </Comment.Group>
  );
};

CommentPanel.propTypes = {
  currentUser: PropTypes.object,
  confessionId: PropTypes.string.isRequired,
  comments: PropTypes.array,
  postComment: PropTypes.func
};

export default compose(
  firebaseConnect(props => {
    return [{ path: `comments/${props.confessionId}` }];
  }),
  connect(({ firebase }, props) => ({
    comments: getVal(firebase, `ordered/comments/${props.confessionId}`)
  }))
)(CommentPanel);
