// generic API manager module that can be extended for a variety of modules

const remoteURL = "https://oso-server.herokuapp.com/"

class APIManager {
    constructor(route) {
        this.route = route
    }

  get(id) {
   return fetch(`${remoteURL}/${this.route}/${id}`).then(e => e.json())
  }

  all() {
    return fetch(`${remoteURL}/${this.route}`).then(data => data.json())
  }

  delete(id) {
    return fetch(`${remoteURL}/${this.route}/${id}`, {
        method: "DELETE"
      })
        .then(e => e.json())
        .then(() => fetch(`${remoteURL}/${this.route}`))
        .then(e => e.json())
  }

  patch(payload, url) {
    return fetch(`${url}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(data => data.json())
  }

  post(payload) {
    return fetch(`${remoteURL}/${this.route}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(data => data.json())
  }
}

export default APIManager