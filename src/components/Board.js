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

  incrementColumn(columns, increment) {
    const {selectedColumn} = this.state
    const target = selectedColumn === null ? 0 : selectedColumn + increment
    const range = [0, Object.keys(columns).length - 1]
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
              {Object.keys(state.columns).map((id, index) => (
                <Column
                  key={id}
                  id={id}
                  cards={state.columns[id].cards}
                  name={state.columns[id].name}
                  selected={index === this.state.selectedColumn}
                />
              ))}
            </div>

            <KeyboardShortcuts
              keys={{
                27: () => this.clearSelectedColumn(null), // ESC
                37: () => this.incrementColumn(state.columns, -1), // Left
                39: () => this.incrementColumn(state.columns, +1), // Right
                72: () => this.incrementColumn(state.columns, -1), // h
                76: () => this.incrementColumn(state.columns, +1), // l
              }}
            />
          </div>
        )}
      </FirebaseProvider>
    )
  }
}

export default DragDropContext(HTML5Backend)(Board)
