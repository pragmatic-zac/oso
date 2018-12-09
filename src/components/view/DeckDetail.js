import React, { Component } from "react";
// import CardManager from "../../managers/CardManager";
import { Grid, Button } from "semantic-ui-react";
import CardDisplay from "./CardDisplay";
import PublicCardDisplay from "./PublicCardDisplay";

// this is where user will see all of the cards in one deck
// for USER decks

export default class DeckDetail extends Component {
  // set initial state
  state = {
    cards: [],
    deckCards: [],
    loaded: true
  };

  componentWillMount() {
    // CardManager.getCardsInDeck(1).then(deckCards => {
    //   this.setState({
    //     deckCards: deckCards
    //   });
    // });
  }

  render() {
    const deck =
      this.props.allDecks.find(
        a => a.id === parseInt(this.props.match.params.deckId)
      ) || {};

    // this was original code - changed from userDecks to allDecks (to properly handle whether user clicked a public or private deck)
    // const deck =
    // this.props.userDecks.find(
    //   a => a.id === parseInt(this.props.match.params.deckId)
    // ) || {};

    console.log(deck);

    let deleteDeckBtn = "";

    if (deck.userID === this.props.currentUser) {
      deleteDeckBtn = (
        <Button
          basic
          size="tiny"
          icon="delete"
          color="red"
          content="Delete Deck"
          onClick={() => {
            this.props.deleteDeckAndCards(deck.id)
          }}
        />
      );
    } else {
      deleteDeckBtn = null;
    }

    if (this.state.loaded) {
      return (
        <React.Fragment>
          <section>
            <h1>
              {deck.name} (deck details) {deleteDeckBtn}
            </h1>
            <div key={deck.id}>Description: {deck.description}</div>
          </section>
          <br />
          <Grid columns={3}>
            {this.props.allCards.map(card => {
              if (
                card.deckID === deck.id &&
                deck.userID === this.props.currentUser
              ) {
                return (
                  <CardDisplay key={card.id} card={card} {...this.props} />
                );
              } else if (card.deckID === deck.id) {
                return (
                  <PublicCardDisplay
                    key={card.id}
                    card={card}
                    {...this.props}
                  />
                );
              } else {
                return null;
              }
            })}
          </Grid>
        </React.Fragment>
      );
    } else {
      return <React.Fragment>Loading...</React.Fragment>;
    }
  }
}
