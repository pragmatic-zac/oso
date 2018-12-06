import React, { Component } from "react";
// import { Header } from "semantic-ui-react";

// this is where user will see all of the cards in one deck
// for USER decks

export default class DeckDetail extends Component {
  // set initial state
  state = {
    cards: []
  };

  // method to fetch all cards from chosen deck
  // ...I think

  render() {
    const deck =
      this.props.userDecks.find(
        a => a.id === parseInt(this.props.match.params.deckId)
      ) || {};

    return (
      <section>
        <h1>Detail page: {deck.name}</h1>
        <div key={deck.id}>{deck.description}</div>
      </section>
    );
  }
}
