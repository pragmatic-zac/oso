import { Route } from "react-router-dom";
import React, { Component } from "react";
import Home from "./home/Home";
import Login from "./authentication/Login";
import Register from "./authentication/Registration";
import UserManager from "../managers/UserManager";

class ApplicationViews extends Component {
  state = {
    users: [],
    initialized: false
  };

  componentDidMount() {
    let usersLoading = UserManager.getAll().then(allUsers => {
      this.setState({
        users: allUsers
      });
    });

    Promise.all([usersLoading]).then(() => {
      this.setState({
        initialized: true
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/home"
          render={props => {
            return <Home />;
          }}
        />
        <Route
          exact
          path="/login"
          render={props => {
            return <Login {...props} users={this.state.users} />;
          }}
        />
        <Route
          exact
          path="/register"
          render={props => {
            return <Register {...props} users={this.state.users} />;
          }}
        />
      </React.Fragment>
    );
  }
}

export default ApplicationViews;
