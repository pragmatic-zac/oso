import React, { Component } from "react";
import { Button, Card, Grid, Form, Input } from "semantic-ui-react";

export default class MainDeck extends Component {
  state = {
    showCardUpdate: false,
    backUpdateValue: "",
    frontUpdateValue: "",
    front: this.props.card.front,
    back: this.props.card.back
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  editSubmit = e => {
    e.preventDefault();
    // now turn it in to an object
    const editedCard = {
      front: this.state.front,
      back: this.state.back
    };
    // console.log(editedCard);

    let url = `https://oso-server.herokuapp.com/cards/${this.props.card.id}`;

    // and send to database!
    this.props.updateCard(editedCard, url);

    // also set state back so that fields go away
    this.setState({ showCardUpdate: !this.state.showCardUpdate });
  };

  render() {
    const { showCardUpdate } = this.state;

    // I want this in a modal, but for now, starting with inline edit

    let backEditForm = "";
    let frontEditForm = "";

    if (showCardUpdate) {
      backEditForm = (
        <Form onSubmit={this.editSubmit}>
          <Input
            type="text"
            name="back"
            // placeholder={this.props.card.back}
            value={this.state.back}
            onChange={this.onChange}
          />
          <Button type="submit">Save</Button>
        </Form>
      );
      frontEditForm = (
        <Form onSubmit={this.editSubmit}>
          <Input
            type="text"
            name="front"
            // placeholder={this.props.card.front}
            value={this.state.front}
            onChange={this.onChange}
          />
          <Button type="submit">Save</Button>
        </Form>
      );
    } else {
      frontEditForm = null;
      backEditForm = null;
    }

    return (
      <React.Fragment>
        <Grid.Column>
          <Card.Group>
            <Card>
              <Card.Content>
                <Card.Header>
                  Front: {this.props.card.front} {frontEditForm}
                </Card.Header>
                <Card.Description>
                  Back: {this.props.card.back}
                  {backEditForm}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button
                    basic
                    color="green"
                    onClick={() => {
                      this.setState({
                        showCardUpdate: !this.state.showCardUpdate
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    basic
                    color="red"
                    onClick={() => {
                      this.props.deleteCard(this.props.card.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </Card.Group>
        </Grid.Column>
      </React.Fragment>
    );
  }
}
