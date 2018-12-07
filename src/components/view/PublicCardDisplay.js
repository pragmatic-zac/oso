import React, { Component } from "react";
import { Card, Grid } from "semantic-ui-react";

export default class PublicCardDisplay extends Component {
  state = {
    loaded: false
  };

  render() {
    return (
      <React.Fragment>
        <Grid.Column>
          <Card.Group>
            <Card>
              <Card.Content>
                <Card.Header>Front: {this.props.card.front}</Card.Header>
                <Card.Description>
                  Back: {this.props.card.back}
                </Card.Description>
              </Card.Content>
            </Card>
          </Card.Group>
        </Grid.Column>
      </React.Fragment>
    );
  }
}