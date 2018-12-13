import React, { Component } from "react";
import bear from "../../images/oso 2.png";
// import logo from "../../images/logo.svg"
import "./Home.css";
import { Container } from "semantic-ui-react";

export default class Home extends Component {
  render() {
    // greet the user
    let greeting = "";
    let username = sessionStorage.getItem("username");

    if (username === null) {
      // if they're not logged in, tell them to log in or register
      greeting = "Click register or log in to get started!";
    } else {
      greeting = "What's on your mind?";
    }

    return (
      <div className="homeContainer">
        <Container textAlign="center">
          <div>
            <h1>Welcome to Oso!</h1>
            {/* <img src={logo} alt="bear_boi" /> */}
            {/* <img
            src={
              "https://thenypost.files.wordpress.com/2014/09/bear1.jpg?quality=90&strip=all&w=618&h=410&crop=1"
            }
            alt="waving-bear"
          /> */}
            <img src={bear} alt="oso-boi" />
            <p>{greeting}</p>
          </div>
        </Container>
      </div>
    );
  }
}
