import React, { Component } from "react";
import { Grid, Segment, Form, Header, Button, Icon } from "semantic-ui-react";
import "../../app.css";

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
  
  };

  render() {
    return (
      <div className="app">
        <Grid
          textAlign="center"
          verticalAlign="middle"
          className="form__register__login"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="orange" icon>
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
                <Button color="green" size="large" fluid onClick={this.handleSubmit}>
                  Submit
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Signup;
