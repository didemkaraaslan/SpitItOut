import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, getVal } from "react-redux-firebase";
import { Modal, Button, Form, Message, Dropdown } from "semantic-ui-react";

import { tagOptions } from "../../utils/Tags";
import { confessionSchema } from "../../utils/schema";
const Joi = require("@hapi/joi");

class ConfessionModal extends Component {
  state = {
    loading: false,
    shareAs: "user",
    content: "",
    tags: [],
    selectedTagsCount: 0,
    errors: []
  };

  handleChange = (e, { value }) => {
    this.setState({
      [e.target.id]: value
    });
  };

  handleSelect = (e, { value }) => {
    this.setState(prevState => ({
      selectedTagsCount: prevState.selectedTagsCount + 1,
      tags: value
    }));
  };

  createConfession = async () => {
    const { content, tags, shareAs } = this.state;
    const { profile, firebase, gender } = this.props;
    const currentUser = firebase.auth().currentUser;
    const currentUserUid = currentUser && currentUser.uid;

    this.setState({ loading: true, errors: [] });

    const confession = {
      content,
      tags,
      shareAs,
      user: {
        username: profile.username,
        photoURL: profile.photoURL,
        gender,
        uid: currentUserUid
      },
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      numberOfLikes: 0,
      numberOfDislikes: 0,
      numberOfComments: 0,
      feelings: {
        [currentUserUid]: 0
      },
      favorites: {
        [currentUserUid]: 0
      },
      comments: {}
    };

    const validationResult = await this.validateConfession(confession);

    if (validationResult) {
      firebase
        .push("confessions", confession)
        .then(() => {
          this.setState({ loading: false });
          this.props.handleCloseConfessionModal();
        })
        .catch(error => {
          console.error(error);
          this.setState({ loading: false });
        });
    }
  };

  validateConfession = confession => {
    return new Promise((resolve, reject) => {
      Joi.validate(confession, confessionSchema, errors => {
        if (errors) {
          this.setState(prevState => ({
            loading: false,
            errors: [...prevState.errors, errors]
          }));
          resolve(false);
        }
        resolve(true);
      });
    });
  };

  displayErrors = () =>
    this.state.errors.map((error, key) => <p key={key}>{error.message}</p>);

  render() {
    const { shareAs, loading, errors } = this.state;
    const { open } = this.props;

    return (
      <Modal open={open} onClose={this.props.handleCloseConfessionModal}>
        <Modal.Header>Confess Yourself Out</Modal.Header>
        <Modal.Description>
          <p
            style={{
              margin: "5px 0px 5px 10px",
              fontSize: "0.9rem",
              color: "#928D8E"
            }}
          >
            Share your secret with the public either{" "}
            <strong>
              <ins>anonymously</ins>
            </strong>{" "}
            or{" "}
            <strong>
              <ins>use your fullname.</ins>
            </strong>
          </p>
        </Modal.Description>
        <Modal.Content scrolling>
          <Form>
            <Form.TextArea
              id="content"
              label="What is your confession?"
              placeholder="Tell us all about it..."
              onChange={this.handleChange}
              value={this.state.content}
            />
            <Form.Group grouped>
              <label>How would you want to share your confession?</label>
              <Form.Radio
                id="shareAs"
                label="Anonymously"
                value="anonymous"
                checked={shareAs === "anonymous"}
                onChange={this.handleChange}
              />
              <Form.Radio
                id="shareAs"
                label="Use your fullname"
                value="user"
                checked={shareAs === "user"}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Dropdown
              id="tags"
              selection
              clearable
              multiple
              header={<Dropdown.Header content="Filter by tags" icon="tags" />}
              value={this.state.tags}
              label="Which tags describe your confession the best?"
              labeled
              options={tagOptions}
              placeholder="Pick at most 3 tags"
              onChange={this.handleSelect}
            />
          </Form>
          {errors.length > 0 && <Message error>{this.displayErrors()}</Message>}
        </Modal.Content>
        <Modal.Actions>
          <Button primary loading={loading} onClick={this.createConfession}>
            SHARE
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

ConfessionModal.propTypes = {
  open: PropTypes.bool,
  firebase: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  gender: PropTypes.string,
  currentUser: PropTypes.object.isRequired,
  handleCloseConfessionModal: PropTypes.func
};

export default compose(
  firebaseConnect(props => {
    const uid = props.currentUser && props.currentUser.uid;
    return [{ path: `users/${uid}/gender` }];
  }),
  connect(({ firebase }, props) => ({
    gender: getVal(firebase, `data/users/${props.currentUser.uid}/gender`)
  }))
)(ConfessionModal);
