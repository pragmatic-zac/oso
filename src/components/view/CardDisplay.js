import React, { Component } from "react";
import { Button, Card, Grid, Form, Input } from "semantic-ui-react";

export default class MainDeck extends Component {
  state = {
    showCardUpdate: false,
    backUpdateValue: "",
    frontUpdateValue: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  editSubmit = e => {
    e.preventDefault();
    console.log(this.state.frontUpdateValue);
    // now stringify and send to database
  };

  render() {
    const { showCardUpdate, backUpdateValue, frontUpdateValue } = this.state;

    // I want this in a modal, but for now, starting with inline edit
    // going to need an edit form for both front and back of card
    let backEditForm = "";
    let frontEditForm = "";

    if (showCardUpdate) {
      backEditForm = (
        <Form onSubmit={this.editSubmit}>
          <Input
            type="text"
            name="backUpdateValue"
            placeholder={this.props.card.back}
            value={backUpdateValue}
            onChange={this.onChange}
          />
          <Button type="submit">Save</Button>
        </Form>
      );
      frontEditForm = (
        <Form onSubmit={this.editSubmit}>
          <Input
            type="text"
            name="frontUpdateValue"
            placeholder={this.props.card.front}
            value={frontUpdateValue}
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
