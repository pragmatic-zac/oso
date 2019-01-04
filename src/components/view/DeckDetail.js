import React, { Component } from "react";
// import CardManager from "../../managers/CardManager";
import { Grid, Button, Input, Form, Modal, Header, Checkbox } from "semantic-ui-react";
import CardDisplay from "./CardDisplay";
import PublicCardDisplay from "./PublicCardDisplay";

// this is where user will see all of the cards in one deck
// for USER decks

export default class DeckDetail extends Component {
  state = {
    deck: "",
    cards: [],
    loaded: true,
    showDetailsUpdate: false,
    name: "",
    description: "",
    open: false,
    newFront: "",
    newBack: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  editSubmit = e => {
    e.preventDefault();

    const editedDeckDetails = {
      name: this.state.name,
      description: this.state.description
    };

    let url = `https://oso-server.herokuapp.com/${this.state.deck}`;
    this.props.updateDeck(editedDeckDetails, url);

    // also set state back so that fields go away
    this.setState({ showDetailsUpdate: !this.state.showDetailsUpdate });
  };

  newCardSubmit = e => {
    e.preventDefault();
    const newCardToSave = {
      front: this.state.newFront,
      back: this.state.newBack,
      deckID: this.state.deck
    };

    // console.log(newCardToSave);
    this.props.postNewCard(newCardToSave);
    // set state back so they're not on the next card, close modal
    this.setState({ front: "", back: "", open: false });
  };

  // for modal
  close = () => this.setState({ open: false });
  show = dimmer => () => this.setState({ dimmer, open: true });

  componentWillMount() {
    // NOTE - I do NOT want to have to keep this, but with the way I built public/private decks, this is how it has to work for now
    // when I refactor how those are displayed, title and description will be available in props
    // having to do this for now so I can get title/description out of state for EDIT deck

    const deck =
      this.props.allDecks.find(
        a => a.id === parseInt(this.props.match.params.deckId)
      ) || {};

    this.setState({
      deck: deck.id,
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
    let createNewBtn = "";
    // let createdBy = ""

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
            this.props.history.push("/maindeck");
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

      const { open, dimmer } = this.state;
      createNewBtn = (
        <Modal
          dimmer={dimmer}
          open={open}
          onClose={this.close}
          trigger={
            <Button basic size="tiny" color="green" onClick={this.show(true)}>
              Add New Card
            </Button>
          }
        >
          <Modal.Header>Add New Card</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form onSubmit={this.newCardSubmit}>
                <Header>Front</Header>
                <Input type="text" name="newFront" onChange={this.onChange} />
                <Header>Back</Header>
                <Input type="text" name="newBack" onChange={this.onChange} />
                {/* <Button basic color="green" onClick={() => {}}>
                  Save Card
                </Button> */}
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close}>Back</Button>
            <Button
              onClick={this.newCardSubmit}
              positive
              icon="add circle"
              labelPosition="right"
              content="Save Card"
            />
          </Modal.Actions>
        </Modal>
      );
    } else {
      deleteDeckBtn = null;
      editDeckNameBtn = null;
      createNewBtn = null;
    }

    // form for editing deck details

    if (this.state.showDetailsUpdate) {
      titleUpdateForm = (
        <Form onSubmit={this.editSubmit}>
          <Input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.state.name}
          />
        </Form>
      );
      detailsUpdateForm = (
        <Form onSubmit={this.editSubmit}>
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
            {/* testing a share Checkbox - this needs to have a state that also does a patch on that deck/fetch again to re-render */}
            {/* <div>
              Share <Checkbox></Checkbox>
            </div> */}
            <br />
            <div>
              {createNewBtn} {editDeckNameBtn} {deleteDeckBtn}
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
