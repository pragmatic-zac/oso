import React, { Component } from "react";
import { Header, Card } from "semantic-ui-react";

export default class MainDeck extends Component {
  // set initial state
  state = {
    decks: []
  };

  // method to fetch all decks - not currently being used, as data is fetched in top level component
  getDecks = () => {
    return fetch("http://localhost:5002/decks").then(data => data.json());
  };

  componentDidMount() {
    // console.log("main deck component mounted");
  }

  render() {
    // get current user
    let currentUser = parseInt(sessionStorage.getItem("userID"));

    return (
      <React.Fragment>
        <Header as="h1">View All Decks</Header>
        <div>
          <h3>Public Decks</h3>

          {this.props.decks.map(deck => {
            if (deck.id !== currentUser) {
              return (
                <Card
                  href="#card-example-link-card"
                  key={deck.id}
                  header={deck.name}
                  meta={deck.description}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
        <br />
        <div>
          <h3>My Decks</h3>
          {this.props.decks.map(deck => {
            if (deck.id === currentUser) {
              return (
                <Card
                  href="#card-example-link-card"
                  key={deck.id}
                  header={deck.name}
                  meta={deck.description}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      </React.Fragment>
    );
  }
}
