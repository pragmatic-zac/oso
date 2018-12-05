import React, { Component } from "react";
import "./App.css";
import ApplicationViews from "./components/ApplicationViews";
import Navbar from "./components/nav/NavBar"

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default App;
