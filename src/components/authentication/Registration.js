import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import UserManager from "../../managers/UserManager";
import { Link } from "react-router-dom";

export default class Login extends Component {
  // Set initial state
  state = {
    username: "",
    password: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  // function to clear all the fields on the page
  clearFields = e => {
    this.refs.userField.value = "";
    this.refs.passField.value = "";
    this.refs.newUserField.value = "";
    this.refs.newPassField.value = "";
  };

  // logout function
  logout = () => {
    console.log("logout clicked");
    // clear out session storage
    sessionStorage.clear();
  };

  // registration function
  registerUser = event => {
    event.preventDefault();
    // check database to see if user exists
    let verified = true;
    let message = "";
    for (let i = 0; i < this.props.users.length; i++) {
      // this checks if user already exists
      if (this.props.users[i].username.indexOf(this.state.username) !== -1) {
        message = "Username already exists, please try logging in.";
        verified = false;
        break;
      } else {
        verified = true;
      }
    }
    // if user was not in database, allow registration
    if (verified) {
      message = "New user saved. Please log in.";

      // create an object to be saved to database
      let toSave = {
        username: this.state.username,
        password: this.state.password
      };

      // post them to the database (object is stringified in UserManager)
      UserManager.post(toSave);
    }
    console.log(message);
    this.props.history.push("/home")
  };

  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.registerUser}>
          <h1 className="h3 mb-3 font-weight-normal list">
            New user registration
          </h1>
          <label htmlFor="newUsername">Username</label>
          <Form.Input
            onChange={this.handleFieldChange}
            type="text"
            id="username"
            placeholder="desired username"
            required=""
            autoFocus=""
          />
          <label htmlFor="newPassword">Password</label>
          <Form.Input
            onChange={this.handleFieldChange}
            type="password"
            id="password"
            placeholder="desired password"
            required=""
          />
          <Button basic color="green" type="submit">
            Register
          </Button>
        </Form>
        <br />
        <Button onClick={this.logout} basic color="red" type="">
          Log out
        </Button>
        <Button as={Link} size="tiny" color="black" className="card-link" to={`/login/`}>Already Have an Account? Click here.</Button>

      </React.Fragment>
    );
  }
}