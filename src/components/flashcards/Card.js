import React, { Component } from "react";
import "./Card.css";
import { Button } from "semantic-ui-react";

// this is where the test itself will live

export default class CardModule extends Component {
  render() {
    console.log(this.props.currentCard);
    return (
      <div className="card-container">
        <div className="card">
          <div className="front">
            <div className="spanish">{this.props.currentCard.front}</div>
          </div>
          <div className="back">
            <div className="english" />
            {this.props.currentCard.back}
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
        </div>
        <div className="flashcard-button-row-bottom">
          <Button
            basic
            color="gray"
            onClick={() => {
              this.props.backToSelection();
            }}
          >
            Select Another Quiz
          </Button>
        </div>
      </div>
    );
  }
}
