import React, { Component } from "react";
import CardManager from "../../managers/CardManager";
import { Card, Button } from "semantic-ui-react";

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
    CardManager.getCardsInDeck().then(deckCards => {
      this.setState({
        deckCards: deckCards
      });
    });
  }

  render() {
    const deck =
      this.props.userDecks.find(
        a => a.id === parseInt(this.props.match.params.deckId)
      ) || {};

    
    console.log(this.state.deckCards)  

    // console.log(this.props.deckCards);
    // console.log("current deck id: " + deck.id);
    // console.log(this.props.allCards);

    // this is working, returns an array
    // let filtered = this.props.deckCards.filter(function(item) {
    //   return item.deckID === deck.id;
    // });

    // console.log(filtered);

    // now I have filtered array, which tells me what cards to go get
    // how do I use filtered to get to those specific cards?

    // let newArr = filtered.map(a => {
    //   if (a.cardID === this.props.allCards[0].id) {
    //     return this.props.allCards[0];
    //   } else {
    //     return false;
    //   }
    // });
    // console.log(newArr);

    // but I need to be able to get this down to 1 lower level component, Flashcard (this will handle display of each card)

    // also, once I figure this out, I need to figure out how to change my fetch depending on what screen I'm on. Currently deckID=1 is hardcoded in to the fetch
    // if events bubble up, can I get {deck} passed up to app views to re-fetch?

    ///

    if (this.state.loaded) {
      return (
        <React.Fragment>
          <section>
            <h1>{deck.name} (deck details)</h1>
            <div key={deck.id}>Description: {deck.description}</div>
          </section>
          <br />
          {/* this will need to be a lower level component */}
          <Card.Group>
            <Card key={deck.id}>
              <Card.Content>
                <Card.Header>Front of Card</Card.Header>
                {/* <Card.Header>{newArr[0].front}</Card.Header> */}
                <Card.Description>Back of Card</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button
                    basic
                    color="green"
                    onClick={() => {
                      console.log("edit clicked");
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    basic
                    color="red"
                    onClick={() => {
                      console.log("delete clicked");
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </Card.Group>
        </React.Fragment>
      );
    } else {
      return <React.Fragment>Loading...</React.Fragment>;
    }
  }
}
