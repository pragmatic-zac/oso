import React, { Component } from "react";
import { Button, Card } from "semantic-ui-react";

export default class MainDeck extends Component {
  state = {
    loaded: false
  };



  render() {
    return <React.Fragment>
        <Card.Group>
            <Card>
              <Card.Content>
                <Card.Header>Front: {this.props.card.front}</Card.Header>
                <Card.Description>Back: {this.props.card.back}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button
                    basic
                    color="green"
                    onClick={() => {
                      console.log("edit clicked");
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    basic
                    color="red"
                    onClick={() => {
                      console.log("delete clicked");
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </Card.Group>
    </React.Fragment>
  }
}