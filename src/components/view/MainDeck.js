import React, { Component } from "react";
import { Header, Card } from "semantic-ui-react";

export default class MainDeck extends Component {
  // set initial state
  state = {
    decks: [],
    userDecks: [],
    publicDecks: [],
    loaded: false
  };

  // method to fetch all decks
  getDecks = () => {
    return fetch("http://localhost:5002/decks").then(data => data.json());
  };

  // method to get public decks
  getPublicDecks = () => {
    return fetch(
      `http://localhost:5002/decks?userID_ne=${
        this.props.currentUser
      }&shared=true`
    ).then(data => data.json());
  };

  // method to get user decks
  getUserDecks = () => {
    return fetch(
      `http://localhost:5002/decks?userID=${this.props.currentUser}`
    ).then(data => data.json());
  };

  componentDidMount() {
    // let currentUser = parseInt(sessionStorage.getItem("userID"));
    // console.log(currentUser);
    // trying these in top level component
    // this.getDecks().then(allDecks => {
    //   this.setState({
    //     decks: allDecks
    //   });
    // });
    // this.getPublicDecks().then(data => console.log(data));
    // this.getUserDecks().then(data => console.log(data));
    // this.getPublicDecks().then(publicDecks => {
    //   this.setState({
    //     publicDecks: publicDecks
    //   });
    // });
    // this.getUserDecks().then(userDecks => {
    //   this.setState({
    //     userDecks: userDecks
    //   });
    // });
    // if kept here, shove these into promise.all with loaded state being reset once they resolve
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
                href="#card-example-link-card"
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
          {/* {this.state.decks.map(deck => {
            if (deck.id === this.currentUser) {
              return (
                <Card
                  href="#card-example-link-card"
                  key={deck.id}
                  header={deck.name}
                  meta={deck.description}
                />
              );
            } else {
              return null;
            }
          })} */}
        </div>
      </React.Fragment>
    );
  }
}
