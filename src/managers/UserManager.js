import APIManager from "./APIManager"

// user manager to handle database interactions for login and registration

class UserManager extends APIManager {
  getUser(id) {
    return this.get(id)
  }
  getAll() {
    return this.all()
  }
  removeAndList(id) {
    return this.delete(id).then(() => this.all())
  }
  post(newUser) {
    return fetch("http://localhost:5002/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(data => data.json())
  }
}

export default new UserManager("user")