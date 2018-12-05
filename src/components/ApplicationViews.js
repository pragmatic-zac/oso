import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";

class ApplicationViews extends Component {
  state = {
    users: [],
    initialized: false
  };

  render () {
      return (
          <React.Fragment>
              hi! router will go here.
          </React.Fragment>
      )
  }
}

export default ApplicationViews;
