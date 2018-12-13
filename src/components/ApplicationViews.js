import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { Loader, Segment, Dimmer } from "semantic-ui-react";
import Home from "./home/Home";
import Login from "./authentication/Login";
import Register from "./authentication/Registration";
import UserManager from "../managers/UserManager";
import MainDeck from "./view/MainDeck";
import DeckDetail from "./view/DeckDetail";
import DecksManager from "../managers/DecksManager";
import CardManager from "../managers/CardManager";
import Flashcard from "./flashcards/Flashcard";
import Profile from "./profile/Profile";

class ApplicationViews extends Component {
  state = {
    users: [],
    currentUser: [],
    allDecks: [],
    publicDecks: [],
    userDecks: [],
    allCards: [],
    deckCards: [],
    voice: 14,
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

  // thought - this is going to reset state on allCards, but not on usercards or publiccards. should I refetch them here too?
  // or should I refactor the way I'm displaying public and private decks? that will be a lot of work so going to get this working for now, but keep it in mind
  deleteCard = id => {
    CardManager.deleteCardAndList(id).then(allCards => {
      this.setState({
        allCards: allCards
      });
    });
  };

  // delete decks and relist - but also delete the cards associated with that deck
  deleteDeckAndCards = deckID => {
    // consider setting initialized state to false until the data comes back
    // and also history.push to maindeck page

    DecksManager.deleteDeck(deckID)
      .then(allDecks => {
        this.setState({
          allDecks: allDecks,
          initialized: false
        });
      })
      .then(() => {
        // run forEach over allCards - if the card is in the deck we're deleting, delete that card too
        this.state.allCards.forEach(card => {
          if (card.deckID === deckID) {
            // console.log(card)
            this.deleteCard(card.id);
          }
        });
      })
      .then(() => {
        // and now get all the cards again
        return CardManager.getAll().then(allCards => {
          this.setState({
            allCards: allCards,
            initialized: true
          });
        });
      });
    //   ^ think I need to return a promise here for .then to work in deck detail (for history push)
  };

  updateCard = (payload, url) => {
    CardManager.patchAndListCards(payload, url).then(allCards => {
      this.setState({ allCards: allCards });
    });
  };

  updateDeck = (payload, url) => {
    console.log(payload);

    let patchAndListAllDecks = DecksManager.patchAndListDecks(payload, url);

    let relistUserDecks = DecksManager.getUserDecks(this.state.currentUser);

    // does promise all wait for 1 to work before 2? no! so.....
    // trying it with a callback!

    patchAndListAllDecks.then(data =>
      this.setState({ allDecks: data }, () => {
        relistUserDecks.then(userDecks => {
          this.setState({ userDecks: userDecks });
        });
      })
    );
  };

  postNewDeck = payload => {
    DecksManager.postAndListDecks(payload).then(allDecks => {
      this.setState({ allDecks: allDecks });
    });
  };

  postNewCard = payload => {
    CardManager.postAndListCards(payload).then(allCards => {
      this.setState({ allCards: allCards });
    });
  };

  // update user voice selection
  updateVoice = (payload, url) => {
    UserManager.updateVoice(payload, url).then(allUsers => {
      this.setState({
        allUsers: allUsers
      });
      //   console.log(allUsers);
    });
  };

  // check to see if user is logged in
  isAuthenticated = () => sessionStorage.getItem("username") !== null;

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
              if (this.isAuthenticated()) {
                return (
                  <MainDeck
                    {...props}
                    currentUser={this.state.currentUser}
                    decks={this.state.decks}
                    publicDecks={this.state.publicDecks}
                    userDecks={this.state.userDecks}
                    postNewDeck={this.postNewDeck}
                    allDecks={this.state.allDecks}
                  />
                );
              } else return <Redirect to="/login" />;
            }}
          />
          <Route
            path="/maindeck/:deckId(\d+)"
            render={props => {
              if (this.isAuthenticated()) {
                return (
                  <DeckDetail
                    {...props}
                    publicDecks={this.state.publicDecks}
                    userDecks={this.state.userDecks}
                    allCards={this.state.allCards}
                    deckCards={this.state.deckCards}
                    allDecks={this.state.allDecks}
                    currentUser={this.state.currentUser}
                    deleteCard={this.deleteCard}
                    deleteDeckAndCards={this.deleteDeckAndCards}
                    updateCard={this.updateCard}
                    updateDeck={this.updateDeck}
                    postNewCard={this.postNewCard}
                  />
                );
              } else {
                return;
              }
            }}
          />
          <Route
            exact
            path="/flashcard"
            render={props => {
              if (this.isAuthenticated()) {
                return (
                  <Flashcard
                    {...props}
                    users={this.state.users}
                    currentUser={this.state.currentUser}
                    allCards={this.state.allCards}
                    allDecks={this.state.allDecks}
                    userDecks={this.state.userDecks}
                    voice={this.state.voice}
                  />
                );
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
          <Route
            exact
            path="/profile"
            render={props => {
              if (this.isAuthenticated()) {
                return (
                  <Profile
                    {...props}
                    users={this.state.users}
                    currentUser={this.state.currentUser}
                    updateVoice={this.updateVoice}
                  />
                );
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Segment>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          </Segment>
        </React.Fragment>
      );
    }
  }
}

export default ApplicationViews;
