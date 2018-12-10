import React, { Component } from "react";
// import CardManager from "../../managers/CardManager";
import { Grid, Button, Input, Form } from "semantic-ui-react";
import CardDisplay from "./CardDisplay";
import PublicCardDisplay from "./PublicCardDisplay";

// this is where user will see all of the cards in one deck
// for USER decks

export default class DeckDetail extends Component {
  // set initial state
  state = {
    cards: [],
    deckCards: [],
    loaded: true,
    showDetailsUpdate: false,
    name: "",
    description: ""
  };

  componentWillMount() {
    // NOTE - I do NOT want to have to keep this, but with the way I built public/private decks, this is how it has to work for now
    // when I refactor how those are displayed, title and description will be available in props
    // having to do this for now so I can get title/description out of state for EDIT deck

    const deck =
      this.props.allDecks.find(
        a => a.id === parseInt(this.props.match.params.deckId)
      ) || {};

    this.setState({
      name: deck.name,
      description: deck.description
    });
  }

  render() {
    const deck =
      this.props.allDecks.find(
        a => a.id === parseInt(this.props.match.params.deckId)
      ) || {};

    let deleteDeckBtn = "";
    let editDeckNameBtn = "";
    let titleUpdateForm = "";
    let detailsUpdateForm = "";

    if (deck.userID === this.props.currentUser) {
      deleteDeckBtn = (
        <Button
          basic
          size="tiny"
          icon="delete"
          color="red"
          content="Delete Deck"
          onClick={() => {
            this.props.deleteDeckAndCards(deck.id);
          }}
        />
      );

      editDeckNameBtn = (
        <Button
          basic
          size="tiny"
          icon="edit"
          color="orange"
          content="Edit"
          onClick={() => {
            this.setState({ showDetailsUpdate: !this.state.showDetailsUpdate });
          }}
        />
      );
    } else {
      deleteDeckBtn = null;
      editDeckNameBtn = null;
    }

    // form for editing deck details

    if (this.state.showDetailsUpdate) {
      titleUpdateForm = (
        <Form onSubmit={this.onSubmit}>
          <Input
            type="text"
            name="title"
            onChange={this.onChange}
            value={this.state.name}
          />
        </Form>
      );
      detailsUpdateForm = (
        <Form onSubmit={this.onSubmit}>
          <Input
            type="text"
            name="description"
            onChange={this.onChange}
            value={this.state.description}
          />
        </Form>
      );
    } else {
      titleUpdateForm = null;
      detailsUpdateForm = null;
    }

    if (this.state.loaded) {
      return (
        <React.Fragment>
          <section>
            <h1>
              {deck.name} {titleUpdateForm}
            </h1>
            <div key={deck.id}>
              Description: {deck.description} {detailsUpdateForm}
            </div>
            <br />
            <div>
              {editDeckNameBtn} {deleteDeckBtn}
            </div>
          </section>
          <br />
          <Grid columns={3}>
            {this.props.allCards.map(card => {
              if (
                card.deckID === deck.id &&
                deck.userID === this.props.currentUser
              ) {
                return (
                  <CardDisplay key={card.id} card={card} {...this.props} />
                );
              } else if (card.deckID === deck.id) {
                return (
                  <PublicCardDisplay
                    key={card.id}
                    card={card}
                    {...this.props}
                  />
                );
              } else {
                return null;
              }
            })}
          </Grid>
        </React.Fragment>
      );
    } else {
      return <React.Fragment>Loading...</React.Fragment>;
    }
  }
}
