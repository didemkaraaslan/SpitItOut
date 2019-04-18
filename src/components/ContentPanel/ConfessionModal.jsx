import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "semantic-ui-react";

const tagOptions = [
  {
    key: "0",
    text: "All",
    value: "all"
  },
  {
    key: "1",
    text: "Sad",
    value: "sad"
  },
  {
    key: "2",
    text: "Happy",
    value: "happy"
  }
];

class ConfessionModal extends Component {
  state = {
    shareOption: "user"
  };

  handleChange = (e, { value }) => {
    this.setState({ shareOption: value });
  };

  render() {
    const { shareOption } = this.state;
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
              label="What is your confession?"
              placeholder="Tell us all about it..."
            />
            <Form.Group grouped>
              <label>How would you want to share your confession?</label>
              <Form.Radio
                label="Anonymously"
                value="anonymous"
                checked={shareOption === "anonymous"}
                onChange={this.handleChange}
              />
              <Form.Radio
                label="Use your fullname"
                value="user"
                checked={shareOption === "user"}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Select
              fluid
              label="Choose Tag"
              options={tagOptions}
              placeholder="Pick tag"
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button primary>SHARE</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

ConfessionModal.propTypes = {
  open: PropTypes.bool
};

export default ConfessionModal;
