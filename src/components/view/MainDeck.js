import React, { Component } from "react";
import { Header, Card } from "semantic-ui-react";
// import CardManager from "../../managers/CardManager"

export default class MainDeck extends Component {
  // set initial state
  state = {
    loaded: false
  };

  componentDidMount() {
    // was fetching user and public decks here, but moved those to app views because that data is needed elsewhere

  }

  render() {
    console.log(this.props.userDecks);
    return (
      <React.Fragment>
        <Header as="h1">View All Decks</Header>
        <div>
          <h3>Public Decks</h3>

          {this.props.publicDecks.map(deck => {
            return (
              <Card
                color="blue"
                href={`/maindeck/${deck.id}`}
                key={deck.id}
                header={deck.name}
                meta={deck.description}
              />
            );
          })}
        </div>
        <br />
        <div>
          <h3>My Decks</h3>

          {this.props.userDecks.map(deck => {
            return (
              <Card
                color="green"
                href={`/maindeck/${deck.id}`}
                key={deck.id}
                header={deck.name}
                meta={deck.description}
              />
              
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}
