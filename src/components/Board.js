import React, {Component} from 'react'
import Column from './Column'
import HTML5Backend from 'react-dnd-html5-backend'
import AppBar from './AppBar'
import {DragDropContext} from 'react-dnd'
import {FirebaseProvider} from '../backend'
import {KeyboardShortcuts} from './KeyboardShortcuts'
import {clamp} from '../utils'

class Board extends Component {
  state = {selectedColumn: null}

  incrementSelectedColumn() {
    const range = [0, Object.keys(this.state.columns).length - 1]
    const target =
      this.state.selectedColumn === null ? 0 : this.state.selectedColumn + 1
    this.setState({selectedColumn: clamp(target, range)})
  }

  decrementSelectedColumn() {
    const range = [0, Object.keys(this.state.columns).length - 1]
    const target = this.state.selectedColumn - 1
    this.setState({selectedColumn: clamp(target, range)})
  }

  clearSelectedColumn() {
    this.setState({selectedColumn: null})
  }

  render() {
    return (
      <FirebaseProvider firebaseKey={this.props.boardId}>
        {state => (
          <div className="App">
            <AppBar
              onButtonTouchTap={columnName =>
                this.backend.addColumn(columnName)
              }
              loading={state.loading}
            />

            <h2 className="board-title">{state.name}</h2>

            <div className="columns">
              {Object.keys(state.columns).map((key, index) => (
                <Column
                  key={key}
                  id={key}
                  cards={state.columns[key].cards}
                  name={state.columns[key].name}
                  selected={index === this.state.selectedColumn}
                />
              ))}
            </div>

            <KeyboardShortcuts
              keys={{
                27: () => this.clearSelectedColumn(), // ESC
                37: () => this.decrementSelectedColumn(), // Left
                39: () => this.incrementSelectedColumn(), // Right
                72: () => this.decrementSelectedColumn(), // h
                76: () => this.incrementSelectedColumn(), // l
              }}
            />
          </div>
        )}
      </FirebaseProvider>
    )
  }
}

export default DragDropContext(HTML5Backend)(Board)
