import React, { Suspense, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { withFirebase } from "react-redux-firebase";
import { withRouter, Link } from "react-router-dom";
import { withTranslation, Trans } from "react-i18next";
import {
  Grid,
  Segment,
  Form,
  Header,
  Button,
  Icon,
  Message
} from "semantic-ui-react";
import "../../app.css";

class Signup extends Component {
  state = {
    usersRef: this.props.firebase.database().ref("users"),
    username: "",
    email: "",
    gender: "male",
    password: "",
    passwordConfirmation: "",
    loading: false,
    errors: []
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleGenderChange = (e, { value }) => this.setState({ gender: value });

  handleSubmit = (detectedLanguage, event) => {
    event.preventDefault();
    const { username, email, gender, password } = this.state;
    const { firebase } = this.props;

    this.setState({ loading: true, errors: [] });

    const [first, last] = username.split(" ");
    const avatarBackground = gender === "female" ? "f44259" : "42f498";

    if (this.isFormValid()) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(createdUser => {
          createdUser.user
            .updateProfile({
              displayName: username,
              photoURL: `https://ui-avatars.com/api/?name=${first}+${last}&background=${avatarBackground}&color=fff`
            })
            .then(() => {
              this.saveUserIntoDatabase(createdUser, detectedLanguage)
                .then(() => {
                  this.setState({ loading: false, errors: [] });
                  this.props.history.push("/signin");
                })
                .catch(error => {
                  console.error(error);
                  this.setState(prevState => ({
                    loading: false,
                    errors: [
                      ...prevState.errors,
                      {
                        code: "database_save_user_error",
                        errorMessage:
                          "User couldn't been saved into firebase realtime database"
                      }
                    ]
                  }));
                });
            })
            .catch(error => {
              this.setState(prevState => ({
                loading: false,
                errors: [...prevState.errors, error]
              }));
            });
        })
        .catch(error => {
          let errorCode = error.code;
          let errorMessage = error.message;

          this.setState(prevState => ({
            loading: false,
            errors: [...prevState.errors, { code: errorCode, errorMessage }]
          }));
        });
    } else {
      this.setState({ loading: false });
    }
  };

  isFormEmpty = () => {
    const {
      username,
      password,
      gender,
      email,
      passwordConfirmation
    } = this.state;
    return (
      !username.length ||
      !password.length ||
      !gender.length ||
      !email.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordsMatch = () =>
    this.state.password === this.state.passwordConfirmation;

  isFormValid = () => {
    let error;

    if (this.isFormEmpty()) {
      error = {
        code: "password_empty",
        errorMessage: "Please fill in all of the fields."
      };
      this.setState(prevState => ({
        errors: [...prevState.errors, error]
      }));
      return false;
    } else if (!this.isPasswordsMatch()) {
      error = {
        code: "password_empty",
        errorMessage: "Password confirmation must be same with the password."
      };
      this.setState(prevState => ({
        errors: [...prevState.errors, error]
      }));
      return false;
    }

    return true;
  };

  displayErrors = () =>
    this.state.errors.map((error, key) => (
      <p key={key}>{error.errorMessage}</p>
    ));

  saveUserIntoDatabase = (createdUser, detectedLanguage) => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      username: createdUser.user.displayName,
      email: createdUser.user.email,
      photoURL: createdUser.user.photoURL,
      gender: this.state.gender,
      prefs: {
        theme: {
          activeTheme: "light"
        },
        language: {
          language: detectedLanguage
        }
      }
    });
  };

  render() {
    const { loading, gender, errors } = this.state;
    const { t, i18n } = this.props;
    const detectedLanguage = i18n.language;

    return (
      <Suspense fallback="loading">
        <div className="signup">
          <Grid
            textAlign="center"
            verticalAlign="middle"
            className="form__register__login"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="violet" icon>
                <Icon name="comment alternate outline" />
                {t("register.registerForSpititout")}
              </Header>
              <Form className="signup__form">
                <Segment>
                  <Form.Field>
                    <Form.Input
                      fluid
                      placeholder={t("register.username")}
                      onChange={this.handleChange}
                      icon="users"
                      iconPosition="left"
                      name="username"
                      type="text"
                    />
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      fluid
                      placeholder={t("register.email")}
                      onChange={this.handleChange}
                      icon="mail"
                      iconPosition="left"
                      name="email"
                      type="email"
                    />
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      fluid
                      placeholder={t("register.password")}
                      onChange={this.handleChange}
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      type="password"
                    />
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      fluid
                      placeholder={t("register.passwordConfirmation")}
                      onChange={this.handleChange}
                      icon="repeat"
                      iconPosition="left"
                      name="passwordConfirmation"
                      type="password"
                    />
                  </Form.Field>
                  <Segment>
                    <Form.Group inline>
                      <label>{t("register.gender")}</label>
                      <Form.Radio
                        label={t("register.male")}
                        name="radioGroup"
                        value="male"
                        checked={gender === "male"}
                        onChange={this.handleGenderChange}
                      />
                      <Form.Radio
                        label={t("register.female")}
                        name="radioGroup"
                        value="female"
                        checked={gender === "female"}
                        onChange={this.handleGenderChange}
                      />
                    </Form.Group>
                  </Segment>
                  <Button
                    color="green"
                    size="large"
                    loading={loading}
                    fluid
                    onClick={event => {
                      this.handleSubmit(detectedLanguage, event);
                    }}
                  >
                    {t("register.signup")}
                  </Button>
                </Segment>
              </Form>
              {errors.length > 0 && (
                <Message error>{this.displayErrors()}</Message>
              )}
              <Message>
                <Icon name="help" />
                <Trans i18nKey="register.alreadySignedup">
                  Already signed up? <Link to="/signin">Login here</Link>{" "}
                  instead.
                </Trans>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      </Suspense>
    );
  }
}

Signup.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object
};

export default compose(
  withTranslation(),
  withFirebase,
  withRouter,
  connect(({ firebase: { auth } }) => ({ auth }))
)(Signup);
