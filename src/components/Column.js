import React, {Component} from 'react'
import {DropTarget} from 'react-dnd'
import Paper from 'material-ui/Paper'
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import Card from './Card'
import AddCardButton from './AddCardButton'
import RemoveColumnButton from './RemoveColumnButton'
import {BackendActions} from '../backend'

let canDropYN = true

const cardTarget = {
  drop(props) {
    return {
      id: props.id,
      name: props.name,
      type: 'column',
    }
  },
  hover(props, monitor) {
    const item = monitor.getItem()
    canDropYN = item.parentId !== props.id
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
    const {id, name, cards} = this.props
    const {connectDropTarget, isOver, canDrop, selected} = this.props

    return (
      <BackendActions>
        {backend => (
          <div className="column">
            {this.selectedIndicator()}

            <Paper className="column-container">
              {connectDropTarget(
                <h2
                  className="clearfix"
                  onDoubleClick={() => backend.editColumn(id, name)}
                >
                  <span style={{float: 'left'}}>{name}</span>
                  <RemoveColumnButton
                    onClick={() => backend.removeColumn(id)}
                  />
                </h2>,
              )}

              <ul className="column__card-list">
                {cards &&
                  Object.keys(cards)
                    .map(key => ({...cards[key], key}))
                    .sort((a, b) => (a.votes || 0) < (b.votes || 0))
                    .map(card => (
                      <Card
                        key={card.key}
                        name={card.name}
                        votes={card.votes}
                        subCards={card.subCards}
                        id={card.key}
                        parentId={this.props.id}
                        onMergeCard={(item, dropResult) =>
                          backend.mergeCard(item, dropResult)
                        }
                        onMoveCard={(oldColumnId, newColumnId, id) =>
                          backend.moveCard(oldColumnId, newColumnId, id)
                        }
                      />
                    ))}
                {isOver && canDrop && this.renderPlaceholder()}
              </ul>

              <AddCardButton
                keyboardShortcutsActive={selected}
                onSubmit={newCardName => backend.addCard(id, newCardName)}
              />
            </Paper>
          </div>
        )}
      </BackendActions>
    )
  }
}

export default DropTarget('Card', cardTarget, collect)(Column)
