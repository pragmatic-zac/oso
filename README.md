# Oso

![oso_logo](https://github.com/zacjones91/oso/blob/master/src/images/oso%202.png?raw=true)

Oso is a Spanish-learning app that is based on flashcards and incorporates multiple forms of user interaction with both text and speech, using web speech API for TTS and STT.  Built using React and styled with Semantic UI and CSS, Oso is designed to be a CRUD app and is supported by a flat data-structure utilizing JSON Server.

I built this application for my front end capstone project for Nashville Software School.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To start, you'll need to download and install NPM. [Get it here.](https://www.npmjs.com/get-npm)

### Installing

Open your command line and type

```
git clone git@github.com:zacjones91/oso.git
```

One more step for installing everything...

```
npm install
```


Now we need to start the server. Navigate to the api folder by typing

```
cd api
```

To start the server, type

```
json-server -w -p 5002 database.json
```

Open a second command line window and navigate to the same directory. To start the app, type

```
npm start
``` 

## Using the app

If you'd like to see an existing user's login, try logging in with username "zac" and password "saban".

* Note that this version of Oso does not offer secure storage. Don't save anything sensitive to this database!

Now that you have the app installed and running, let's learn Spanish the Oso way!

### Check your flashcards

Click on "All Decks" to see what card decks are available to you. Your decks are displayed on the left, and universally available decks appear on the right. Click on a deck to see the cards in it.

![deckview](https://gph.is/2RdZjXy)

If the selected deck belongs to another user, you may view the cards, but not create/edit/delete.

If the selected deck belongs to you, you may edit or delete any of the cards. You may also add as many new cards as you want.

### Take a quiz

Click on "Flashcards" to launch the flashcard module. You will be presented with two dropdown menus, one with public decks and one with your private decks. Once you select a deck, press "Launch Quiz".

You will be presented with the front of your first flashcard. To see the back, simply hover over the card. Press "Next Card" and you'll be presented with a new random card from your deck.

If you'd like to hear the word spoken to you, press "Listen".

If you'd like to test your pronunciation, press "Speak". If it's your first time using Oso, the app will ask for permission to use your microphone. Grant the permission. Now you can speak the word on the flashcard and see if you got it right!

### Change voice

Oso offers four different voices - two speakers from Spain and two from Mexico. If you'd like to select a different one, click on your username and choose your preferred voice. Your preference will be saved automatically.

## Built With

* [React](https://reactjs.org/) - Web framework
* [NPM](https://www.npmjs.com/) - Dependency management
* [Semantic UI React](https://react.semantic-ui.com/) - Styling components

## Future versions

I plan to deploy Oso using Heroku.

In version 2.0 of Oso, I plan to implement
* Deck sharing
* Universally available learning materials (grammar, culture, etc.)
* User progress tracking and study notes
* Secure login via Auth0