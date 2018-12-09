import APIManager from "./APIManager";

// card manager to handle database interactions for individual cards

const remURL = "http://localhost:5002"

class CardManager extends APIManager {
  // basic fetch to get all cards
  getAll() {
    return this.all();
  }

  // hard coded for now, eventually need id to be an argument
  getDeckCards() {
    return fetch(`http://localhost:5002/deck_cards?deckID=1`).then(data =>
      data.json()
    );
  }

  // hardcoded for now, eventually "deck" needs to be in here on deck detail page where I'm calling it
  getCardsInDeck(deckID) {
    return fetch(`http://localhost:5002/cards?deckID=${deckID}`).then(data => data.json());
  }

  deleteCardAndList(id) {
    return this.delete(id).then(() => this.all())
  }

  // deleteCardsInDeck(deckID) {
  //   return this.delete(deckID)
  // }

  // not using delete from this.delete() because this is a different URL - includes ?deckID query
  deleteCardsInDeck(deckID) {
    return fetch(`${remURL}/${this.route}?deckID=${deckID}`, {
        method: "DELETE"
      })
        .then(e => e.json())
        .then(() => fetch(`${remURL}/${this.route}`))
        .then(e => e.json())
  }
}

// localhost:5002/cards?deckID=4
// `${remURL}/${this.route}?deckID=${deckID}`

export default new CardManager("cards");
