import React, {Component} from 'react'
import Column from './Column'
import HTML5Backend from 'react-dnd-html5-backend'
import AppBar from './AppBar'
import {DragDropContext} from 'react-dnd'
import backend from '../backend'
import {KeyboardShortcuts} from './KeyboardShortcuts'
import {clamp} from '../utils'

class Board extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      columns: [],
      selectedColumn: null,
    }
  }

  componentDidMount() {
    backend.init(this.props.boardId, val => {
      this.setState({
        loading: false,
        columns: val ? val.columns : [],
        name: val ? val.name : '',
      })
    })
  }

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
    let columnData = this.state.columns || []
    let columns = Object.keys(columnData).map((key, index) => {
      return (
        <Column
          key={key}
          id={key}
          cards={columnData[key].cards}
          name={columnData[key].name}
          addCard={name => backend.addCard(key, name)}
          editCard={(columnId, id, name) =>
            backend.editCard(columnId, id, name)
          }
          removeCard={(columnId, id) => backend.removeCard(columnId, id)}
          moveCard={(oldColumnId, newColumnId, id) =>
            backend.moveCard(oldColumnId, newColumnId, id)
          }
          voteUpCard={(columnId, id) => backend.voteUpCard(columnId, id)}
          voteDownCard={(columnId, id) => backend.voteDownCard(columnId, id)}
          editColumn={(id, name) => backend.editColumn(id, name)}
          removeColumn={id => backend.removeColumn(id)}
          selected={index === this.state.selectedColumn}
        />
      )
    })

    return (
      <div className="App">
        <AppBar
          onButtonTouchTap={columnName => backend.addColumn(columnName)}
          loading={this.state.loading}
        />
        <h2 className="board-title">{this.state.name}</h2>
        <div className="columns">{columns}</div>
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
    )
  }
}

export default DragDropContext(HTML5Backend)(Board)
