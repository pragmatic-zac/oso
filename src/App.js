import React, { Component } from "react";
import "./App.css";
import ApplicationViews from "./components/ApplicationViews";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default App;
