import APIManager from "./APIManager";

// deck manager to handle database interactions for card decks

class DeckManager extends APIManager {
  getAll() {
    return this.all();
  }

  getUserDecks(user) {
    return fetch(`http://localhost:5002/decks?userID=${user}`).then(data =>
      data.json()
    );
  }

  getPublicDecks(user) {
    return fetch(
      `http://localhost:5002/decks?userID_ne=${user}&shared=true`
    ).then(data => data.json());
  }

  // delete deck and associated cards
  deleteDeck(deckID) {
    return this.delete(deckID).then(() => this.all());
  }

  //   removeAndList(id) {
  //     return this.delete(id).then(() => this.all())
  //   }

  //   post(newUser) {
  //     return fetch("http://localhost:5002/user", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(newUser)
  //     }).then(data => data.json())
  //   }
}

export default new DeckManager("decks");
