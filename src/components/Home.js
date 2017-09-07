import React, { Component } from 'react';
import { database } from 'firebase';
import { Redirect } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import "../styles/homepage.css";
import Logo from './Logo'
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
      <div className="homepage-container">
        <h1 className="homepage-title">Dragon Drop Cards</h1>
        <Logo />
        <RaisedButton className="create-board" onClick={() => this.newBoard()}>
          Create New Board
        </RaisedButton>
        { this.state.newUrl && <Redirect push to={this.state.newUrl} /> }
      </div>
    )
  }
}
