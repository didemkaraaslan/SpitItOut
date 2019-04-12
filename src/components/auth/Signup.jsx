import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { withFirebase } from "react-redux-firebase";
import { Link } from "react-router-dom";
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
const gravatar = require("gravatar");

class Signup extends Component {
  state = {
    username: "",
    email: "",
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
              this.setState({ loading: false, errors: [] });
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
    const { username, password, email, passwordConfirmation } = this.state;
    return (
      !username.length ||
      !password.length ||
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

  render() {
    const { loading, errors } = this.state;

    return (
      <div className="app">
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
  firebase: PropTypes.object
};

export default compose(
  withFirebase,
  connect(({ firebase: { auth } }) => ({ auth }))
)(Signup);
