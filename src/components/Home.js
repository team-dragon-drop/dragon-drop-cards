import React, { Component } from 'react';
import { database } from 'firebase';
import { Redirect } from 'react-router';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  newBoard() {
    this.setState({
      newUrl: `/b/${database().ref('/').push().key}`
    });
  }

  render() {
    return (
      <main>
        <h1>Welcome to Dragon Drop Cards</h1>

        <pre>
          TODO: Make this page look sexy
        </pre>

        <button onClick={() => this.newBoard()}>New Board</button>
        { this.state.newUrl && <Redirect push to={this.state.newUrl} /> }
      </main>
    )
  }
}
