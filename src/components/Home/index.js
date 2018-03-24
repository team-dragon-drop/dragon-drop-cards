import React, {Component} from 'react'
import {Redirect} from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Logo from './Logo'
import {newBoardKey} from '../../backend'
import {generateDragonName} from './dragonGenerator'
import './styles.css'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      boardName: generateDragonName(),
    }
  }

  handleChange(event) {
    this.setState({boardName: event.target.value})
  }

  newBoard() {
    this.setState({newUrl: `/b/${newBoardKey(this.state.boardName)}`})
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
            inputStyle={{color: 'white'}}
            floatingLabelStyle={{color: 'white'}}
            value={this.state.boardName}
            onChange={event => this.handleChange(event)}
          />
          <RaisedButton onClick={() => this.newBoard()}>
            Create New Board
          </RaisedButton>
        </div>
        {this.state.newUrl && <Redirect push to={this.state.newUrl} />}
      </div>
    )
  }
}
