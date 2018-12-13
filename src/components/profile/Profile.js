import React, { Component } from "react";
import { Header, Container, Message, Grid } from "semantic-ui-react";
import "./Profile.css";
import spain from "../../images/spain.png";
import mexico from "../../images/mexico.png";

export default class UserProfile extends Component {
  onClick = number => {
    console.log(number);
  };

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
          <Message>
            <Header as="h5">Select Your Voice</Header>
            <p className="currentVoice">
              Current selection: {currentUserInfo[0].voice}
            </p>
            <br />
            <Grid>
              <br />
              <Grid.Column width={4}>
                <div className="voice-option">
                  <img
                    src={spain}
                    alt="spain"
                    className="image"
                    id="14"
                    onClick={() => {
                      this.onClick(14);
                    }}
                  />
                  <br />
                  Jorge - Spain
                </div>
              </Grid.Column>
              <Grid.Column width={4}>
                <div className="voice-option">
                  <img
                    src={mexico}
                    alt="mexico"
                    className="image"
                    onClick={() => {
                      this.onClick(15);
                    }}
                  />
                  <br />
                  Juan - Mexico
                </div>
              </Grid.Column>

              <Grid.Column width={4}>
                <div className="voice-option">
                  <img
                    src={mexico}
                    alt="mexico"
                    className="image"
                    onClick={() => {
                      this.onClick(31);
                    }}
                  />
                  <br />
                  Paulina - Mexico
                </div>
              </Grid.Column>
              <Grid.Column width={4}>
                <div className="voice-option">
                  <img
                    src={spain}
                    alt="spain"
                    className="image"
                    onClick={() => {
                      this.onClick(29);
                    }}
                  />
                  <br />
                  Monica - Spain{" "}
                </div>
              </Grid.Column>
            </Grid>
          </Message>
        </Container>
      </React.Fragment>
    );
  }
}
