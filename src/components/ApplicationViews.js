import { Route } from "react-router-dom";
import React, { Component } from "react";
import Home from "./home/Home"
import Login from "./authentication/Login"
import Register from "./authentication/Registration"

class ApplicationViews extends Component {
  state = {
    users: [],
    initialized: false
  };

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
