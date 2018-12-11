import React, { Component } from "react";
import "./Flashcard.css";
import Card from "./Card";
// import DeckSelect from "./DeckSelect";
import { Form, Button, Header } from "semantic-ui-react";
import CardManager from "../../managers/CardManager";

// this is the container for the testing portion of the app

// eventually I will let the user select (from a dropdown) which test they'd like to take
// that will fill the state of "cards"

// FOR NOW I am selecting all cards to fill state

export default class FlashcardContainer extends Component {
  state = {
    quizSelected: false,
    // cards: this.props.allCards,
    cards: "",
    currentCard: [],
    deckSelected: "",
    deckSelectedID: ""
  };

  //   componentWillMount() {
  //     const currentCards = this.state.cards;

  //     this.setState({
  //       currentCard: this.getRandomCard(currentCards),
  //       cards: currentCards
  //     });
  //   }

  // function to get random card
  getRandomCard = currentCards => {
    let card = currentCards[Math.floor(Math.random() * currentCards.length)];
    return card;
  };

  // same as getRandomCard but it sets state (needed this separate for now, can refactor later, but needed this for onClick of "next card")
  nextFlashcard = cardsInDeck => {
    let nextCard = cardsInDeck[Math.floor(Math.random() * cardsInDeck.length)];
    this.setState({
      currentCard: nextCard
    });
  };

  // handles dropdown change/selection
  // adapted from: https://stackoverflow.com/questions/51227359/how-to-retrieve-the-key-into-a-semantic-ui-react-dropdown
  handleChange = (event, data) => {
    const { value } = data;
    const { key } = data.options.find(o => o.value === value);
    // put the selected deck's ID into state
    this.setState({
      deckSelectedID: key
    });
  };

  // handles dropdown submit
  handleDropdownSubmit = e => {
    console.log(this.state.deckSelectedID);

    // now I need to use user selection to set state of cards
    // fill state with array of those cards
    // options:
    // iterate over allCards, creating new array, and set state with new array
    // run fetch to get cards from that specific deck
    // ...........
    // I prefer option 2

    // do a promise.all here and consolidate launchQuiz function into here?

    CardManager.getCardsInDeck(this.state.deckSelectedID).then(cards => {
      console.log(cards);
      this.setState({
        cards: cards
      });
    });
  };

  // trying to find what I suspected was a timing issue - using this button to launch a quiz, AFTER user has made selection

  launchQuiz = () => {
    const currentCards = this.state.cards;

    this.setState({
      currentCard: this.getRandomCard(currentCards),
      cards: currentCards,
      quizSelected: true
    });
  };

  render() {
    // need to fill this up with decks
    // const options = [
    //   { key: "m", text: "Male", value: "male" },
    //   { key: "f", text: "Female", value: "female" },
    //   { key: "n", text: "Prefer not to say", value: "prefer not to say" }
    // ];

    // loop over decks and make a new array that is formatted to work with Semantic's dropdown
    const options2 = this.props.allDecks.map(deck => {
      return { key: deck.id, text: deck.name, value: deck.name };
    });

    if (this.state.quizSelected) {
      return (
        <React.Fragment>
          <Card
            currentCard={this.state.currentCard}
            getRandomCard={this.getRandomCard}
          />
          <div className="flashcard-button-row">
            <Button
              basic
              color="purple"
              onClick={() => this.nextFlashcard(this.state.cards)}
            >
              Next Card
            </Button>
          </div>
        </React.Fragment>
      );
    } else {
      // return <DeckSelect />
      return (
        <React.Fragment>
          <div>
            <Header as="h1">Select Your Deck </Header>
            <p>
              Eventually there will be two dropdowns here - one for public, one
              for private
            </p>
            <p>On selection/submit, set state of quizSelected to true</p>
          </div>
          <br />
          <Form.Select
            // label="Options"
            options={options2}
            placeholder="Decks"
            id="deckSelected"
            name="deckSelected"
            onChange={this.handleChange}
          />
          <br />
          <Button
            basic
            color="purple"
            onClick={() => {
              this.handleDropdownSubmit();
            }}
          >
            Confirm Selection
          </Button>
          <Button
            basic
            color="purple"
            onClick={() => {
              this.launchQuiz();
            }}
          >
            Launch Quiz
          </Button>
        </React.Fragment>
      );
    }
  }
}
