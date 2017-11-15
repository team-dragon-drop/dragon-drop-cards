import React, { Component } from 'react';
import { Redirect } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import "../styles/homepage.css";
import Logo from "./Logo";
import backend from "../backend";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      boardName: ""
    };
  }

  handleChange(event) {
    this.setState({ boardName: event.target.value });
  }

  newBoard() {
    this.setState({
      newUrl: `/b/${backend.newBoard(this.state.boardName)}`
    });
  }

  render() {
    return (
      <div className="homepage-container">
        <h1 className="homepage-title">Dragon Drop Cards</h1>
        <Logo />
        <div className="create-board">
          <TextField
            floatingLabelText="Board Name"
            fullWidth={true}
            inputStyle={{ color: "white" }}
            floatingLabelStyle={{ color: "white" }}
            onChange={ event => this.handleChange(event) }
          />
          <RaisedButton onClick={() => this.newBoard()}>
            Create New Board
          </RaisedButton>
        </div>
        { this.state.newUrl && <Redirect push to={this.state.newUrl} /> }
      </div>
    )
  }
}
