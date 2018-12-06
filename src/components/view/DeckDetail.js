import React, { Component } from "react";
// import { Header } from "semantic-ui-react";

// this is where user will see all of the cards in one deck

export default class DeckDetail extends Component {
  // set initial state
  state = {
    decks: [],
    cards: []
  };

  // method to fetch all cards from chosen deck
  

  componentDidMount() {
    console.log("component mounted")
  }

  

  render() {


    return (
      <React.Fragment>
        <p>this is where deck detail will live</p>
      </React.Fragment>
    );
  }
}