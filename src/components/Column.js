import React, {Component} from 'react'
import {DropTarget} from 'react-dnd'
import Paper from 'material-ui/Paper'
import Card from './Card'
import AddCardButton from './AddCardButton'
import RemoveColumnButton from './RemoveColumnButton'
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'

let canDropYN = true

const cardTarget = {
  drop(props) {
    return {
      id: props.id,
      name: props.name,
    }
  },
  hover(props, monitor) {
    const item = monitor.getItem()
    canDropYN = item.parentId === props.id ? false : true
    document.getElementById(item.id).style.display = canDropYN
      ? 'none'
      : 'block'
  },
  canDrop() {
    return canDropYN
  },
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

class Column extends Component {
  cardItems() {
    const cardsObject = this.props.cards
    return Object.keys(cardsObject)
      .map(key => ({...cardsObject[key], key}))
      .sort((a, b) => (a.votes ? a.votes < b.votes : 1))
      .map(card => (
        <Card
          key={card.key}
          name={card.name}
          votes={card.votes}
          id={card.key}
          parentId={this.props.id}
          editCard={this.props.editCard}
          removeCard={this.props.removeCard}
          moveCard={this.props.moveCard}
          voteUp={this.props.voteUpCard}
          voteDown={this.props.voteDownCard}
        />
      ))
  }

  renderPlaceholder() {
    return (
      <li
        style={{
          height: '40px',
          opacity: 0.5,
          backgroundColor: 'grey',
        }}
      />
    )
  }

  selectedIndicator() {
    if (this.props.selected) {
      return (
        <KeyboardArrowDown
          color="#fff"
          className="column__selected-indicator"
        />
      )
    }
  }

  render() {
    return this.props.connectDropTarget(
      <div className="column">
        {this.selectedIndicator()}
        <Paper className="column-container">
          <h2
            className="clearfix"
            onDoubleClick={() => {
              this.props.editColumn(this.props.id, this.props.name)
            }}
          >
            <span style={{float: 'left'}}>{this.props.name}</span>

            <RemoveColumnButton
              removeColumn={() => this.props.removeColumn(this.props.id)}
            />
          </h2>

          <ul className="column__card-list">
            {this.props.cards ? this.cardItems() : ''}
            {this.props.isOver &&
              this.props.canDrop &&
              this.renderPlaceholder()}
          </ul>

          <AddCardButton
            keyboardShortcutsActive={this.props.selected}
            addCard={this.props.addCard}
          />
        </Paper>
      </div>,
    )
  }
}

export default DropTarget('Card', cardTarget, collect)(Column)
