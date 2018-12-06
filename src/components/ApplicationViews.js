import { Route } from "react-router-dom";
import React, { Component } from "react";
import Home from "./home/Home";
import Login from "./authentication/Login";
import Register from "./authentication/Registration";
import UserManager from "../managers/UserManager";
import MainDeck from "./view/MainDeck";
import DeckDetail from "./view/DeckDetail";
import DecksManager from "../managers/DecksManager";

class ApplicationViews extends Component {
  state = {
    users: [],
    // eventually use this to store current user
    // currentUser: [],
    decks: [],
    initialized: false
  };

  componentDidMount() {
    let usersLoading = UserManager.getAll().then(allUsers => {
      this.setState({
        users: allUsers
      });
    });

    let decksLoading = DecksManager.getAll().then(allDecks => {
      this.setState({
        decks: allDecks
      });
    });

    // not using this right now - trying via Deck Manager instead
    // let getDecks = () => {
    //   return fetch("http://localhost:5002/decks")
    //     .then(data => data.json())
    //     // .then(da => console.log(da))
    //     .then(allDecks =>
    //       this.setState({
    //         decks: allDecks
    //       })
    //     );
    // };

    Promise.all([usersLoading, decksLoading]).then(() => {
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
              return <MainDeck {...props} decks={this.state.decks} />;
            }}
          />
          <Route
            path="/decks/:deckId(\d+)"
            render={props => {
              return <DeckDetail {...props} />;
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
