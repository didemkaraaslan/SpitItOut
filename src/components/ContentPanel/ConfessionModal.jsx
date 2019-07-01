import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, getVal } from "react-redux-firebase";
import { Modal, Button, Form, Message, Dropdown } from "semantic-ui-react";
import { withTranslation, Trans } from "react-i18next";

import { tagOptions } from "../../utils/Tags";
import { confessionSchema } from "../../utils/schema";
const Joi = require("@hapi/joi");

class ConfessionModal extends Component {
  state = {
    loading: false,
    shareAs: "",
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

  handleShareOptionChange = (e, { value }) => {
    this.setState({
      shareAs: value
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
    const { t, open } = this.props;

    return (
      <Modal open={open} onClose={this.props.handleCloseConfessionModal}>
        <Modal.Header>{t("confession.confessYourselfOut")}</Modal.Header>
        <Modal.Description>
          <p
            style={{
              margin: "5px 0px 5px 10px",
              fontSize: "0.9rem",
              color: "#928D8E"
            }}
          >
            <Trans i18nKey="confession.shareYourSecret">
              Share your secret with the public either
              <strong>
                <ins>anonymously</ins>
              </strong>
              or
              <strong>
                <ins>use your fullname.</ins>
              </strong>
            </Trans>
          </p>
        </Modal.Description>
        <Modal.Content scrolling>
          <Form>
            <Form.TextArea
              id="content"
              label={t("confession.whatIsYourConfession")}
              placeholder={t("confession.tellUsAllAboutIt")}
              onChange={this.handleChange}
              value={this.state.content}
            />
            <Form.Group grouped>
              <label>{t("confession.howYouLikeToConfess")}</label>
              <Form.Radio
                label={t("confession.anonymously")}
                value="anonymous"
                checked={shareAs === "anonymous"}
                onChange={this.handleShareOptionChange}
              />
              <Form.Radio
                label={t("confession.useYourFullName")}
                value="user"
                checked={shareAs === "user"}
                onChange={this.handleShareOptionChange}
              />
            </Form.Group>
            <Dropdown
              id="tags"
              selection
              clearable
              multiple
              header={
                <Dropdown.Header
                  content={t("confession.filterByTags")}
                  icon="tags"
                />
              }
              value={this.state.tags}
              label={t("confession.whichTagsDescribeBest")}
              labeled
              options={tagOptions}
              placeholder={t("confession.pickAtmostThreeTags")}
              onChange={this.handleSelect}
            />
          </Form>
          {errors.length > 0 && <Message error>{this.displayErrors()}</Message>}
        </Modal.Content>
        <Modal.Actions>
          <Button primary loading={loading} onClick={this.createConfession}>
            {t("confession.publishConfession")}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

ConfessionModal.propTypes = {
  t: PropTypes.func,
  open: PropTypes.bool,
  firebase: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  gender: PropTypes.string,
  currentUser: PropTypes.object.isRequired,
  handleCloseConfessionModal: PropTypes.func
};

export default compose(
  withTranslation(),
  firebaseConnect(props => {
    const uid = props.currentUser && props.currentUser.uid;
    return [{ path: `users/${uid}/gender` }];
  }),
  connect(({ firebase }, props) => ({
    gender: getVal(firebase, `data/users/${props.currentUser.uid}/gender`)
  }))
)(ConfessionModal);
