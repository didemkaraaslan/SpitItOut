import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { withFirebase } from "react-redux-firebase";
import { withRouter, Link } from "react-router-dom";
import {
  Grid,
  Segment,
  Form,
  Header,
  Button,
  Icon,
  Message,
  Radio
} from "semantic-ui-react";
import "../../app.css";
const gravatar = require("gravatar");

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

  handleSubmit = event => {
    event.preventDefault();
    const { username, email, password } = this.state;
    const { firebase } = this.props;

    this.setState({ loading: true, errors: [] });

    if (this.isFormValid()) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(createdUser => {
          createdUser.user
            .updateProfile({
              displayName: username,
              photoURL: gravatar.url(createdUser.user.email, {
                s: "60",
                protocol: "https"
              })
            })
            .then(() => {
              this.saveUserIntoDatabase(createdUser)
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

  saveUserIntoDatabase = createdUser => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      username: createdUser.user.displayName,
      email: createdUser.user.email,
      photoURL: createdUser.user.photoURL,
      gender: this.state.gender,
      prefs: {
        theme: {
          activeTheme: "light"
        }
      }
    });
  };

  render() {
    const { loading, gender, errors } = this.state;

    console.log(gender)
    return (
      <div className="signup">
        <Grid
          textAlign="center"
          verticalAlign="middle"
          className="form__register__login"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="violet" icon>
              <Icon name="comment alternate outline" />
              Register for SpitItOut
            </Header>
            <Form className="signup__form">
              <Segment>
                <Form.Field>
                  <Form.Input
                    fluid
                    placeholder="Username"
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
                    placeholder="Email Address"
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
                    placeholder="Password"
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
                    placeholder="Password Confirmation"
                    onChange={this.handleChange}
                    icon="repeat"
                    iconPosition="left"
                    name="passwordConfirmation"
                    type="password"
                  />
                </Form.Field>
                <Segment>
                  <Form.Group inline>
                    <label>Gender</label>
                    <Form.Radio
                      label="Male"
                      name="radioGroup"
                      value="male"
                      checked={gender === "male"}
                      onChange={this.handleGenderChange}
                    />
                    <Form.Radio
                      label="Female"
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
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              </Segment>
            </Form>
            {errors.length > 0 && (
              <Message error>{this.displayErrors()}</Message>
            )}
            <Message>
              <Icon name="help" />
              Already signed up?&nbsp;<Link to="/signin">Login here</Link>
              &nbsp;instead.
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Signup.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object
};

export default compose(
  withFirebase,
  withRouter,
  connect(({ firebase: { auth } }) => ({ auth }))
)(Signup);
