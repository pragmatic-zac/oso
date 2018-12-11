import React, { Component } from "react";
import "./Flashcard.css";
import Card from "./Card";
// import DeckSelect from "./DeckSelect";
import { Form, Button, Header } from "semantic-ui-react";

// this is the container for the testing portion of the app

// eventually I will let the user select (from a dropdown) which test they'd like to take
// that will fill the state of "cards"

// FOR NOW I am selecting all cards to fill state

export default class FlashcardContainer extends Component {
  state = {
    quizSelected: false,
    cards: this.props.allCards,
    currentCard: [],
    deckSelected: ""
  };

  componentWillMount() {
    const currentCards = this.state.cards;

    this.setState({
      currentCard: this.getRandomCard(currentCards),
      cards: currentCards
    });
  }

  getRandomCard = currentCards => {
    let card = currentCards[Math.floor(Math.random() * currentCards.length)];
    return card;
  };

  handleDropdownChange = (e, { name, value }) =>
    this.setState({ [name]: value });

  //   onChange = e => {
  //     // console.log(e)
  //     this.setState({ [e.target.name]: e.target.value });
  //   };

  handleDropdownSubmit = e => {
    console.log(this.state.deckSelected);
  };

  render() {
    // need to fill this up with decks
    const options = [
      { key: "m", text: "Male", value: "male" },
      { key: "f", text: "Female", value: "female" },
      { key: "n", text: "Prefer not to say", value: "prefer not to say" }
    ];

    // loop over decks and make a new array that is formatted to work with Semantic's dropdown
    const options2 = this.props.allDecks.map(deck => {
        return {key: deck.id, text: deck.name, value: deck.name}
    })

    console.log(options2)

    if (this.state.quizSelected) {
      return <Card currentCard={this.state.currentCard} />;
    } else {
      // return <DeckSelect />
      return (
        <React.Fragment>
          <div>
              <Header as="h1">Select Your Deck </Header>
          </div>
          <br></br>
          <Form.Select
            // label="Options"
            options={options2}
            placeholder="Decks"
            id="deckSelected"
            name="deckSelected"
            onChange={this.handleDropdownChange}
          />
          <br></br>
          <Button
            basic
            color="purple"
            onClick={() => {
              this.handleDropdownSubmit();
            }}
          >
            Launch Flashcards
          </Button>
        </React.Fragment>
      );
    }
  }
}
