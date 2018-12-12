import React, { Component } from "react";
import { Header, Button } from "semantic-ui-react";

export default class SelectedDetail extends Component {
  render() {
    let deckLength = this.props.cards.length;
    console.log(deckLength);

    let details = "";

    if (this.props.isDeckSelected) {
      details = (
        <React.Fragment>
          <Header as="h4">{this.props.deckSelected.name}</Header>
          <p>{this.props.deckSelected.description}</p>
          <p>Cards in deck: {deckLength}</p>
          <Button
            basic
            color="purple"
            onClick={() => {
              this.props.launchQuiz();
            }}
          >
            Launch Quiz
          </Button>
        </React.Fragment>
      );
    } else {
      details = null;
    }

    return <React.Fragment>{details}</React.Fragment>;
  }
}
