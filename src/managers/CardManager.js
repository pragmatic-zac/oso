import APIManager from "./APIManager";

// card manager to handle database interactions for individual cards

const remURL = "http://localhost:5002";

class CardManager extends APIManager {
  // basic fetch to get all cards
  getAll() {
    return this.all();
  }

  getCardsInDeck(deckID) {
    return fetch(`http://localhost:5002/cards?deckID=${deckID}`).then(data =>
      data.json()
    );
  }

  deleteCardAndList(id) {
    return this.delete(id).then(() => this.all());
  }

  // not using delete from this.delete() because this is a different URL - includes ?deckID query
  deleteCardsInDeck(deckID) {
    return fetch(`${remURL}/${this.route}?deckID=${deckID}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => fetch(`${remURL}/${this.route}`))
      .then(e => e.json());
  }

  patchAndListCards(payload, url) {
    return this.patch(payload, url).then(() => this.all());
  }

  postAndListCards(payload) {
    return this.post(payload).then(() => this.all());
  }
}

export default new CardManager("cards");
