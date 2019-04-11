import React, { Component } from "react";
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

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {};
  render() {
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

export default Login;
