import APIManager from "./APIManager";

// deck manager to handle database interactions for card decks

class DeckManager extends APIManager {
  getAll() {
    return this.all();
  }

  getUserDecks(user) {
    return fetch(`https://oso-server.herokuapp.com/decks?userID=${user}`).then(data =>
      data.json()
    );
  }

  getPublicDecks(user) {
    return fetch(
      `https://oso-server.herokuapp.com/decks?userID_ne=${user}&shared=true`
    ).then(data => data.json());
  }

  // delete deck and associated cards
  deleteDeck(deckID) {
    return this.delete(deckID).then(() => this.all());
  }

  patchAndListDecks(payload, url) {
    return this.patch(payload, url).then(() => this.all());
  }

  postAndListDecks(payload) {
    return this.post(payload).then(() => this.all());
  }

  getSpecificDeck(id) {
    return this.get(id);
  }

}

export default new DeckManager("decks");
