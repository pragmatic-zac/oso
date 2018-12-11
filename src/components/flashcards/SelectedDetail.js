import React, { Component } from "react";
import { Header } from "semantic-ui-react";

export default class SelectedDetail extends Component {
  render() {
    return (
      <React.Fragment>
        <Header as="h4">{this.props.deckSelected.name}</Header>
        <p>{this.props.deckSelected.description}</p>
      </React.Fragment>
    );
  }
}
