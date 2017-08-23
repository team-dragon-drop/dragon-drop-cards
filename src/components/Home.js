import React, { Component } from 'react';
import { database } from 'firebase';
import { Redirect } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import "../styles/homepage.css";
import logo from "../assets/dragon-drop-logo.svg";
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
      <main className="homepage-container">
        <div className="homepage">
          <h1 className="homepage-title">Dragon Drop Cards</h1>
          <img className="logo" src={logo} alt="Drop it like it's hot"/>
          <RaisedButton className="create-board" onClick={() => this.newBoard()}>
           Create New Board
          </RaisedButton>
          { this.state.newUrl && <Redirect push to={this.state.newUrl} /> }
        </div>
      </main>
    )
  }
}
