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
  Message
} from "semantic-ui-react";
import "../../app.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
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

    const { email, password } = this.state;
    this.setState({ loading: true, errors: [] });

    if (this.isFormValid()) {
      this.props.firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(signedInUser => {
          this.setState({ loading: false, errors: [] });
          this.props.history.push("/");
        })
        .catch(error => {
          this.setState(prevState => ({
            loading: false,
            errors: [...prevState.errors, error]
          }));
        });
    } else {
      this.setState({
        loading: false,
        errors: [
          {
            code: "form_is_empty",
            message: "Please fill in all the fields."
          }
        ]
      });
    }
  };

  isFormValid = () => this.state.email && this.state.password;

  displayErrors = () =>
    this.state.errors.map((error, key) => <p key={key}>{error.message}</p>);

  render() {
    const { errors } = this.state;

    return (
      <div className="signin">
        <Grid
          textAlign="center"
          verticalAlign="middle"
          className="form__register__login"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="violet" icon>
              <Icon name="comment alternate outline" />
              Login to SpitItOut
            </Header>
            <Form className="signup__form">
              <Segment>
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
                <Button
                  color="green"
                  size="large"
                  fluid
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              </Segment>
            </Form>
            {errors.length > 0 && (
              <Message error> {this.displayErrors()}</Message>
            )}
            <Message>
              <Icon name="help" />
              Dont have an account?&nbsp;
              <Link to="/register">Create your account</Link>
              &nbsp;instead.
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object
};

export default compose(
  withFirebase,
  withRouter,
  connect(({ firebase: { auth } }) => ({ auth }))
)(Login);
