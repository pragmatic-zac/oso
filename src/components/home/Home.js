import React, { Component } from "react";
// import chipmunk from "../../../src/chipmunk.gif";
import "./Home.css"


export default class Home extends Component {
  render() {
    
    // greet the user
    let greeting = "";
    let username = sessionStorage.getItem("username");

    if (username === null) {
        // if they're not logged in, tell them to log in or register
        greeting = "Click register or log in to get started!"
    } else {
        greeting = "What's on your mind?"
    }

    return (
      <div className="homeContainer">
        <div>
          <h1>Welcome to Oso!</h1>
          {/* <img src={chipmunk} alt="nutshell_boi" /> */}
          <p>{greeting}</p>
        </div>
      </div>
    );
  }
}
