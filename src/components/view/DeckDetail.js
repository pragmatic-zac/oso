import React, { Component } from "react";
// import CardManager from "../../managers/CardManager";
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

  componentDidMount() {
    // CardManager.getDeckCards().then(data => {console.log(data)})
    // CardManager.getDeckCards().then(deckCards => {
    //   this.setState({
    //     deckCards: deckCards,
    //     loaded: true
    //   });
    // });
    // this.setState({loaded: true})
  }

  render() {
    const deck =
      this.props.userDecks.find(
        a => a.id === parseInt(this.props.match.params.deckId)
      ) || {};

    // console.log(this.props.allCards);

    console.log(this.props.deckCards);
    console.log(deck);
    console.log(this.props.allCards);

    let filtered = this.props.deckCards.filter(function(item) {
      return item.deckID === 1;
    });

    console.log(filtered);

    // now I have filtered array, which tells me what cards to go get

    // how do I use filtered to get to those specific cards?

    let newArr = filtered.map(a => {
      if (a.cardID === this.props.allCards[0].id) {
        return true;
      } else {
        return false;
      }
    });

    console.log(newArr);

    // also, once I figure this out, I need to figure out how to change my fetch depending on what screen I'm on. Currently deckID=1 is hardcoded in to the fetch

    ///

    if (this.state.loaded) {
      return (
        <React.Fragment>
          <section>
            <h1>Detail page: {deck.name}</h1>
            <div key={deck.id}>{deck.description}</div>
            <p>{this.props.allCards[0].front}</p>
            {/* <p>{this.props.deckCards[0].id}</p> */}
          </section>
          <br />
          <Card.Group>
            <Card key={deck.id}>
              <Card.Content>
                <Card.Header>Front of Card</Card.Header>
                <Card.Description>Back of Card</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green">
                    Edit
                  </Button>
                  <Button basic color="red">
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
