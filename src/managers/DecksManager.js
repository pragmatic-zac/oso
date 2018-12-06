import APIManager from "./APIManager"

// deck manager to handle database interactions for card decks

class DeckManager extends APIManager {

  getAll() {
    return this.all()
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

export default new DeckManager("decks")