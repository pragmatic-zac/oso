import React, { Component } from "react";
import "./Card.css";
import { Button } from "semantic-ui-react";

// this is where the test itself will live

export default class CardModule extends Component {
  render() {
    console.log(this.props.currentCard);
    return (
      <React.Fragment>
        <div className="fcard-container">
          <div className="fcard">
            <div className="front">
              <div className="spanish">{this.props.currentCard.front}</div>
            </div>
            <div className="back">
              <div className="engrish">{this.props.currentCard.back}</div>
            </div>
          </div>
        </div>
        <div className="flashcard-button-row">
          <Button
            basic
            color="purple"
            onClick={() => this.props.nextFlashcard(this.props.cards)}
          >
            Next Card
          </Button>
          <Button
            basic
            color="orange"
            onClick={() =>
              console.log(
                "toss this card: this button will dump this card from array"
              )
            }
          >
            Toss
          </Button>
          <Button basic color="green" onClick={() => console.log("listen")}>
            Listen
          </Button>
          <Button basic color="red" onClick={() => console.log("speak")}>
            Speak
          </Button>
        </div>
        <div className="flashcard-button-row-bottom">
          <Button
            basic
            color="grey"
            onClick={() => console.log("end session, save a note. use this to pop up modal!")}
          >
            End Session
          </Button>
          <Button
            basic
            color="grey"
            onClick={() => {
              this.props.backToSelection();
            }}
          >
            Select Another Deck
          </Button>
        </div>
      </React.Fragment>
    );
  }
}
