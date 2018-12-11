import React, { Component } from "react";
import "./Flashcard.css";
import Card from "./Card";

// this is the container for the testing portion of the app

// eventually I will let the user select (from a dropdown) which test they'd like to take
// that will fill the state of "cards"

// FOR NOW I am selecting my first deck to fill this state

export default class FlashcardContainer extends Component {
  state = {
    cards: this.props.allCards,
    currentCard: []
  };

  componentWillMount() {
    const currentCards = this.state.cards;

    this.setState({ currentCard: this.getRandomCard(currentCards), cards: currentCards });
  }

  getRandomCard = currentCards => {
    let card = currentCards[Math.floor(Math.random() * currentCards.length)]
    return card
  };

  render() {
    return <Card currentCard={this.state.currentCard}/>;
  }
}
