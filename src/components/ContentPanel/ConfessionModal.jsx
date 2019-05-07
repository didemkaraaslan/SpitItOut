import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "semantic-ui-react";

import { tagOptions } from "../../utils/Tags";

class ConfessionModal extends Component {
  state = {
    shareAs: "user",
    content: "",
    tag: ""
  };

  handleChange = (e, { value }) => {
    this.setState({
      [e.target.id]: value
    });
  };

  handleSelect = (e, { value }) => {
    this.setState({ tag: value });
  };

  createConfession = () => {
    const { profile, firebase } = this.props;

    const confession = {
      ...this.state,
      user: {
        username: profile.username,
        photoURL: profile.photoURL
      },
      timestamp: "now",
      views: 222,
      likes: 99,
      dislikes: 22,
      comments: 12
    };

    firebase.push("confessions", confession);
  };

  render() {
    const { shareAs } = this.state;
    const { open } = this.props;

    return (
      <Modal open={open}>
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
            <Form.Select
              id="tag"
              fluid
              value={this.state.tag}
              label="Which tag describes your confession best?"
              options={tagOptions}
              placeholder="Pick a tag"
              onChange={this.handleSelect}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={this.createConfession}>
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
  profile: PropTypes.object.isRequired
};

export default ConfessionModal;
