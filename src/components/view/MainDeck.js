import React, { Component } from "react";
import { Header, Card, Button, Modal, Form, Input } from "semantic-ui-react";
// import CardManager from "../../managers/CardManager"

export default class MainDeck extends Component {
  // set initial state
  state = {
    loaded: false,
    open: false,
    newName: "",
    newDescription: ""
  };

  componentDidMount() {
    // was fetching user and public decks here, but moved those to app views because that data is needed elsewhere
  }

  // for modal
  close = () => this.setState({ open: false });
  show = dimmer => () => this.setState({ dimmer, open: true });

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // NOTE - not currently allowing user to share decks, but this is here for a refactor later
  // can just add a toggle for shared
  newDeckSubmit = e => {
    e.preventDefault();
    const deckToSave = {
      name: this.state.newName,
      description: this.state.newDescription,
      shared: false,
      userID: this.props.currentUser
    };

    console.log(deckToSave);

    this.props.postNewDeck(deckToSave);

    // close the modal
    this.setState({ open: false });
  };

  render() {
    // console.log(this.props.userDecks);

    return (
      <React.Fragment>
        <Header as="h1">All Decks</Header>
        <div>
          <h3>Public Decks</h3>

          {/* on refactor - use a filter here instead of a map. filter by current user */}
          {this.props.publicDecks.map(deck => {
            return (
              <Card color="blue" href={`/maindeck/${deck.id}`} key={deck.id}>
                <Card.Content>
                  <Card.Header>{deck.name}</Card.Header>
                  <Card.Description>{deck.description}</Card.Description>
                </Card.Content>
                {/* was trying buttons here, but as whole card is a link, they do not work. leaving for now and will decide later */}
              </Card>
            );
          })}
        </div>
        <br />
        <div>
          <h3>My Decks</h3>

          <div>
            <Modal
              dimmer={this.state.dimmer}
              open={this.state.open}
              onClose={this.close}
              trigger={
                <Button
                  basic
                  size="tiny"
                  color="green"
                  onClick={this.show("blurring")}
                >
                  Add New Deck
                </Button>
              }
            >
              <Modal.Header>Add New Deck</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Form onSubmit={this.newDeckSubmit}>
                    <Header>Deck Title</Header>
                    <Input
                      type="text"
                      name="newName"
                      onChange={this.onChange}
                    />
                    <Header>Description</Header>
                    <Input
                      type="text"
                      name="newDescription"
                      onChange={this.onChange}
                    />
                    <Button basic color="green" onClick={() => {}}>
                      Save Deck
                    </Button>
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={this.close}>Back</Button>
                {/* unfortunately this does not currently work for submit - known bug */}
                <Button
                  onClick={() => this.newDeckSubmit}
                  positive
                  icon="add circle"
                  labelPosition="right"
                  content="Save Card*"
                />
              </Modal.Actions>
            </Modal>
          </div>

          {this.props.userDecks.map(deck => {
            return (
              <Card color="green" href={`/maindeck/${deck.id}`} key={deck.id}>
                <Card.Content>
                  <Card.Header>{deck.name}</Card.Header>
                  <Card.Description>{deck.description}</Card.Description>
                </Card.Content>
              </Card>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}
