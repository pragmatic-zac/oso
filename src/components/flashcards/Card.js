import React, { Component } from "react";
import "./Card.css";
import { Button } from "semantic-ui-react";

// this is where the test itself will live

export default class CardModule extends Component {
  // function to produce speech synth utterance, fired on button click "listen"
  speakToMe = word => {
    const synth = window.speechSynthesis;
    let sayThis = new SpeechSynthesisUtterance(word);
    // sayThis.voice = synth.getVoices()[14];
    // now getting voice from props - this is set by the user and passed down from app views
    sayThis.voice = synth.getVoices()[this.props.userVoice]
    synth.speak(sayThis);
    // wrap this in new Promise?
  };

  listenToMe = word => {
    /* eslint no-undef:"off"*/
    const recognition = new webkitSpeechRecognition();
    const recogWord = new webkitSpeechGrammarList();
    recognition.lang = "ES";
    recogWord.addFromString(word);
    recognition.grammars = recogWord;
    recognition.onresult = function(event) {
      const userSaid = event.results[0][0].transcript;
      console.log(userSaid);
      if (userSaid === word) {
        alert("Good job!");
      } else {
        alert("You're close, try again!");
      }
    };
    recognition.start();
  };

  render() {
    console.log(this.props.currentCard);
    return (
      <React.Fragment>
        <div className="fcard-container">
          <div className="fcard">
            <div className="front">
              <div className="spanish">{this.props.currentCard.front}</div>
            </div>
            <div className="back">
              <div className="engrish">{this.props.currentCard.back}</div>
            </div>
          </div>
        </div>
        <div className="flashcard-button-row">
          <Button
            basic
            color="purple"
            onClick={() => this.props.nextFlashcard(this.props.cards)}
          >
            Next Card
          </Button>
          {/* <Button
            basic
            color="orange"
            onClick={() =>
              console.log(
                "toss this card: this button will dump this card from array"
              )
            }
          >
            Toss
          </Button> */}
          <Button
            basic
            color="green"
            onClick={() => this.speakToMe(this.props.currentCard.front)}
          >
            Listen
          </Button>
          <Button
            basic
            color="red"
            onClick={() => this.listenToMe(this.props.currentCard.front)}
          >
            Speak
          </Button>
        </div>
        <div className="flashcard-button-row-bottom">
          {/* <Button
            basic
            color="grey"
            onClick={() =>
              console.log("end session, save a note. use this to pop up modal!")
            }
          >
            End Session
          </Button> */}
          <Button
            basic
            color="grey"
            onClick={() => {
              this.props.backToSelection();
            }}
          >
            Select Another Deck
          </Button>
        </div>
      </React.Fragment>
    );
  }
}
