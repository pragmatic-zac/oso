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
    // console.log(this.props.userDecks);

    return (
      <React.Fragment>
        <Header as="h1">All Decks</Header>
        <div>
          <h3>Public Decks</h3>

        {/* on refactor - use a filter here instead of a map. filter by current user */}
          {this.props.publicDecks.map(deck => {
            return (
              <Card color="blue" href={`/maindeck/${deck.id}`} key={deck.id}>
                <Card.Content>
                  <Card.Header>{deck.name}</Card.Header>
                  <Card.Description>{deck.description}</Card.Description>
                </Card.Content>
                {/* was trying buttons here, but as whole card is a link, they do not work. leaving for now and will decide later */}
                {/* <Card.Content extra>
                  <div className="ui two buttons">
                    <Button
                      basic
                      color="blue"
                      onClick={() => {
                        console.log("launch quiz clicked");
                      }}
                    >
                      Launch Quiz
                    </Button>
                  </div>
                </Card.Content> */}
              </Card>
            );
          })}
        </div>
        <br />
        <div>
          <h3>My Decks</h3>

          {this.props.userDecks.map(deck => {
            return (
              <Card color="green" href={`/maindeck/${deck.id}`} key={deck.id}>
                <Card.Content>
                  <Card.Header>{deck.name}</Card.Header>
                  <Card.Description>{deck.description}</Card.Description>
                </Card.Content>
                {/* <Card.Content extra>
                  <div className="ui two buttons">
                    <Button
                      basic
                      color="blue"
                      onClick={() => {
                        console.log("launch quiz clicked");
                      }}
                    >
                      Launch Quiz
                    </Button>
                    <Button
                      basic
                      color="purple"
                      onClick={() => {
                        console.log("delete clicked");
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Content> */}
              </Card>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}
