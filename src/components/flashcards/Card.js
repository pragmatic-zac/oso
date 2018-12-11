import React, { Component } from "react";
import "./Card.css";

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
      </div>
    );
  }
}
