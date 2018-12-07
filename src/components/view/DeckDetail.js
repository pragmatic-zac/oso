import React, { Component } from "react";
import CardManager from "../../managers/CardManager";
// import { Header } from "semantic-ui-react";

// this is where user will see all of the cards in one deck
// for USER decks

export default class DeckDetail extends Component {
  // set initial state
  state = {
    cards: [],
    deckCards: [],
    loaded: false
  };

  componentDidMount() {
    // CardManager.getDeckCards().then(data => {console.log(data)})
    CardManager.getDeckCards().then(deckCards => {
      this.setState({
        deckCards: deckCards,
        loaded: true
      });
    });
  }

  render() {
    const deck =
      this.props.userDecks.find(
        a => a.id === parseInt(this.props.match.params.deckId)
      ) || {};

    // console.log(this.props.allCards);

    // problem => this console log is being hit before the state updates. does componentdidmount not fix this?
    console.log(this.state.deckCards)
    console.log(deck);

    // let filtered = this.state.deckCards.filter

    if (this.state.loaded) {
      return (
        <section>
          <h1>Detail page: {deck.name}</h1>
          <div key={deck.id}>{deck.description}</div>
          <p>{this.props.allCards[0].front}</p>
          <p>{this.state.deckCards[0].id}</p>
        </section>
      );
    } else {
      return <React.Fragment>Loading...</React.Fragment>;
    }
  }
}
