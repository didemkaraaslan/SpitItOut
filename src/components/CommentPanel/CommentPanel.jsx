import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, getVal } from "react-redux-firebase";
import { Header, Form, Button, Comment } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

const CommentPanel = ({
  currentUser,
  confession,
  confessionId,
  comments,
  postComment
}) => {
  const { t } = useTranslation();
  const [displayComments, setDisplayComments] = useState([]);
  const [content, setContent] = useState(" ");
  const [replyCommentId, setReplyCommentId] = useState("");

  return (
    <div className="comments__group">
      <Comment.Group size="small">
        <Header as="h5">{t("commentPanel.comments")}</Header>

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
                    {t("commentPanel.reply")}
                  </Comment.Action>
                </Comment.Actions>
              </Comment.Content>
              {value.replies &&
                (!displayComments.includes(key) ? (
                  <button
                    onClick={() => {
                      setDisplayComments(prevDisplayComments => [
                        ...prevDisplayComments,
                        key
                      ]);
                    }}
                    className="comments__view__replies__btn"
                  >
                    <div className="comment__display__comments__line" />
                    <span style={{ color: "#999" }}>
                      {t("commentPanel.viewReplies")} (
                      {Object.keys(value.replies).length})
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setDisplayComments(prevDisplayComments =>
                        prevDisplayComments.filter(
                          commentKey => commentKey !== key
                        )
                      );
                    }}
                    className="comments__view__replies__btn"
                  >
                    <div className="comment__display__comments__line" />
                    <span style={{ color: "#999" }}>
                      {t("commentPanel.hideReplies")} (
                      {Object.keys(value.replies).length})
                    </span>
                  </button>
                ))}
              <Comment.Group size="small">
                {displayComments.includes(key) &&
                  value.replies &&
                  Object.keys(value.replies).map((key, i) => (
                    <Comment key={i}>
                      <Comment.Avatar src={value.replies[key].photoURL} />
                      <Comment.Content>
                        <Comment.Author as="a">
                          {value.replies[key].author}
                        </Comment.Author>
                        <Comment.Metadata>
                          <div>
                            {moment(value.replies[key].timestamp).fromNow()}
                          </div>
                        </Comment.Metadata>
                        <Comment.Text>
                          {value.replies[key].content}
                        </Comment.Text>
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
              placeholder={t("commentPanel.addComment")}
              className="commentTextarea"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <Button
              content={t("commentPanel.send")}
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
    </div>
  );
};

CommentPanel.propTypes = {
  t: PropTypes.func,
  currentUser: PropTypes.object,
  confession: PropTypes.object,
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
