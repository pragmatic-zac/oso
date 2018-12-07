import React, { Component } from "react";
import "./App.css";
import ApplicationViews from "./components/ApplicationViews";
import Navbar from "./components/nav/NavBar";
import { Container } from "semantic-ui-react";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Container>
          <ApplicationViews />
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
