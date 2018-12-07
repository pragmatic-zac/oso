import React, { Component } from "react";
import CardManager from "../../managers/CardManager";
import { Grid } from "semantic-ui-react";
import CardDisplay from "./CardDisplay";

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
    CardManager.getCardsInDeck(1).then(deckCards => {
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

    // console.log(this.props.allCards);

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

    ///

    if (this.state.loaded) {
      return (
        <React.Fragment>
          <section>
            <h1>{deck.name} (deck details)</h1>
            <div key={deck.id}>Description: {deck.description}</div>
          </section>
          <br />
          <Grid columns={3} >
            {this.props.allCards.map(card => {
              if (card.deckID === deck.id) {
                return (
                  <CardDisplay key={card.id} card={card} {...this.props} />
                );
              } else {
                return null;
              }
            })}
          </Grid>
          {/* <Card.Group>
            <Card key={deck.id}>
              <Card.Content>
                <Card.Header>Front of Card</Card.Header>
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
          </Card.Group> */}
        </React.Fragment>
      );
    } else {
      return <React.Fragment>Loading...</React.Fragment>;
    }
  }
}
