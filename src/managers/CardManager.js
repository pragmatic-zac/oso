import APIManager from "./APIManager";

// card manager to handle database interactions for individual cards

class CardManager extends APIManager {
  // basic fetch to get all cards
  getAll() {
    return this.all();
  }

  // hard coded for now, eventually need id to be an argument
  getDeckCards() {
    return fetch(`http://localhost:5002/deck_cards?deck_id=1`).then(data =>
      data.json()
    );
  }

  // not using this yet
  notusedyet(user) {
    return fetch(`http://localhost:5002/cards?userID=${user}`).then(data =>
      data.json()
    );
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

export default new CardManager("cards");
