import React, { Component } from "react";
import { Header } from "semantic-ui-react";

export default class MainDeck extends Component {
  // set initial state
  state = {
    decks: []
  };

  // method to fetch all decks
  getDecks = () => {
    return fetch("http://localhost:5002/decks").then(data => data.json())
  };

  componentDidMount() {
    // when the page loads, fetch the decks and put them in state  

    // trying to do this at top level (app views) for now
    // this.getDecks().then(allDecks => this.setState({
    //     decks: allDecks
    //   }))

    console.log("main deck component mounted")
  }

  

  render() {

    console.log(this.props.decks[0].name)
    // console.log("hello")


    // to start, don't worry about getting public and private split out. just get all decks on the page

    return (
      <React.Fragment>
        <Header as="h1">View All Decks</Header>
        <div>
          <h3>Public</h3>
        </div>
        <br />
        <div>
          <h3>Private</h3>
        </div>
      </React.Fragment>
    );
  }
}
