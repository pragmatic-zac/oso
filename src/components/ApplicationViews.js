import { Route } from "react-router-dom";
import React, { Component } from "react";
import Home from "./home/Home";
import Login from "./authentication/Login";
import Register from "./authentication/Registration";
import UserManager from "../managers/UserManager";
import MainDeck from "./view/MainDeck";
import DeckDetail from "./view/DeckDetail";
import DecksManager from "../managers/DecksManager";
import CardManager from "../managers/CardManager";

class ApplicationViews extends Component {
  state = {
    users: [],
    currentUser: [],
    allDecks: [],
    publicDecks: [],
    userDecks: [],
    allCards: [],
    deckCards: [],
    initialized: false
  };

  componentDidMount() {
    const currentUser = parseInt(sessionStorage.getItem("userID"));
    this.setState({
      currentUser: currentUser
    });

    let usersLoading = UserManager.getAll().then(allUsers => {
      this.setState({
        users: allUsers
      });
    });

    let decksLoading = DecksManager.getAll().then(allDecks => {
      this.setState({
        allDecks: allDecks
      });
    });

    let loadUserDecks = DecksManager.getUserDecks(currentUser).then(
      userDecks => {
        this.setState({
          userDecks: userDecks
        });
      }
    );

    let loadPublicDecks = DecksManager.getPublicDecks(currentUser).then(
      publicDecks => {
        this.setState({
          publicDecks: publicDecks
        });
      }
    );

    let loadCards = CardManager.getAll().then(allCards => {
      this.setState({
        allCards: allCards
      });
    });

    let loadDeckCards = CardManager.getDeckCards().then(deckCards => {
      this.setState({
        deckCards: deckCards
      });
    });

    Promise.all([
      usersLoading,
      decksLoading,
      loadUserDecks,
      loadPublicDecks,
      loadCards,
      loadDeckCards
    ]).then(() => {
      this.setState({
        initialized: true
      });
    });
  }

  render() {
    if (this.state.initialized) {
      return (
        <React.Fragment>
          <Route
            exact
            path="/home"
            render={props => {
              return <Home />;
            }}
          />
          <Route
            exact
            path="/login"
            render={props => {
              return <Login {...props} users={this.state.users} />;
            }}
          />
          <Route
            exact
            path="/register"
            render={props => {
              return <Register {...props} users={this.state.users} />;
            }}
          />
          <Route
            exact
            path="/maindeck"
            render={props => {
              return (
                <MainDeck
                  {...props}
                  currentUser={this.state.currentUser}
                  decks={this.state.decks}
                  publicDecks={this.state.publicDecks}
                  userDecks={this.state.userDecks}
                />
              );
            }}
          />
          <Route
            path="/maindeck/:deckId(\d+)"
            render={props => {
              return (
                <DeckDetail
                  {...props}
                  publicDecks={this.state.publicDecks}
                  userDecks={this.state.userDecks}
                  allCards={this.state.allCards}
                  deckCards={this.state.deckCards}
                  allDecks={this.state.allDecks}
                />
              );
            }}
          />
        </React.Fragment>
      );
    } else {
      return <React.Fragment>loading...</React.Fragment>;
    }
  }
}

export default ApplicationViews;
