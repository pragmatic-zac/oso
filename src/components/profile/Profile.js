import React, { Component } from "react";
import { Header, Container } from "semantic-ui-react";

export default class UserProfile extends Component {
  render() {
    // find the logged in user's info
    let currentUserInfo = this.props.users.filter(user => {
      return user.id === this.props.currentUser;
    });

    console.log(currentUserInfo[0]);

    return (
      <React.Fragment>
        <Container textAlign="center">
          <Header as="h1">Your profile</Header>
          <br />
          <Header as="h3"> {currentUserInfo[0].username}</Header>
        </Container>
      </React.Fragment>
    );
  }
}
