import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Logo from './Logo';
import { newBoardKey } from '../../backend';
import { generateDragonName } from './dragonGenerator';
import './styles.css';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      boardName: generateDragonName(),
    };
  }

  handleChange(event) {
    this.setState({ boardName: event.target.value });
  }

  newBoard() {
    this.setState({ newUrl: `/b/${newBoardKey(this.state.boardName)}` });
  }

  render() {
    return (
      <div className="homepage-container">
        <h1 className="homepage-title">Dragon Drop Cards</h1>
        <em className="homepage-description">
          {' '}
          Come for the dragons, stay for the cards.
        </em>
        <Logo />
        <div className="create-board">
          <TextField
            inputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
            label="Board Name"
            fullWidth={true}
            value={this.state.boardName}
            onChange={event => this.handleChange(event)}
          />
          <Button
            variant="outlined"
            style={{ color: 'white', borderColor: 'white' }}
            onClick={() => this.newBoard()}
          >
            Create New Board
          </Button>
        </div>
        {this.state.newUrl && <Redirect push to={this.state.newUrl} />}
      </div>
    );
  }
}
