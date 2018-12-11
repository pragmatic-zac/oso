import { Route } from "react-router-dom";
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

  // IDEA: run sort on ComponentWillMount - fetch all decks, then use that to fill userDecks and publicDecks

  //   componentWillMount() {
  //     const currentUser = parseInt(sessionStorage.getItem("userID"));

  //     DecksManager.getUserDecks(currentUser).then((data) => console.log(data))
  //   }

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
  //////
  // small problem - this is going to reset state on allDecks, but I am using userDecks and publicDecks from separate fetches in MainDeck
  // perhaps performance would improve if I just used allDecks on MainDeck and that would solve this problem too?
  // leaving it for now (just to get update functional) but this needs to be addressed

  updateDeck = (payload, url) => {
    console.log(payload);

    let patchAndListAllDecks = DecksManager.patchAndListDecks(payload, url);

    let relistUserDecks = DecksManager.getUserDecks(this.state.currentUser);

    // Promise.all([patchAndListAllDecks, relistUserDecks]).then(data => {
    //   console.log(data);
    //   this.setState({
    //     allDecks: data[0],
    //     userDecks: data[1]
    //   });
    // });

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

  ////////

  postNewCard = payload => {
    CardManager.postAndListCards(payload).then(allCards => {
      this.setState({ allCards: allCards });
    });
  };

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
                  postNewDeck={this.postNewDeck}
                  allDecks={this.state.allDecks}
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
                  currentUser={this.state.currentUser}
                  deleteCard={this.deleteCard}
                  deleteDeckAndCards={this.deleteDeckAndCards}
                  updateCard={this.updateCard}
                  updateDeck={this.updateDeck}
                  postNewCard={this.postNewCard}
                  //   history={this.history}
                />
              );
            }}
          />
          <Route
            exact
            path="/flashcard"
            render={props => {
              return (
                <Flashcard
                  {...props}
                  users={this.state.users}
                  currentUser={this.state.currentUser}
                  allCards={this.state.allCards}
                  allDecks={this.state.allDecks}
                  userDecks={this.state.userDecks}
                />
              );
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
