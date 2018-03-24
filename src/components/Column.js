import React, {Component} from 'react'
import {DropTarget} from 'react-dnd'
import Paper from 'material-ui/Paper'
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import {Card} from './Card'
import AddCardButton from './AddCardButton'
import RemoveColumnButton from './RemoveColumnButton'
import {BackendActions} from '../backend'

let canDrop = true

const cardTarget = {
  drop(props) {
    return {
      id: props.id,
      name: props.name,
      columnId: props.id,
      refSpec: {columnId: props.id},
      type: 'column',
    }
  },
  hover(props, monitor) {
    const item = monitor.getItem()
    canDrop = item.type === 'subcard' || item.columnId !== props.id
  },
  canDrop() {
    return canDrop
  },
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

const SelectedIndicator = () => (
  <KeyboardArrowDown color="#fff" className="column__selected-indicator" />
)

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

  render() {
    const {id, name, cards, selected} = this.props
    const {connectDropTarget, isOver, canDrop} = this.props

    return (
      <BackendActions>
        {backend => (
          <div className="column">
            {selected && <SelectedIndicator />}

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
                    .map(id => ({...cards[id], id}))
                    .sort((a, b) => (a.votes || 0) < (b.votes || 0))
                    .map(card => {
                      const refSpec = {columnId: id, cardId: card.id}
                      return (
                        <Card
                          key={card.id}
                          id={card.id}
                          name={card.name}
                          votes={card.votes}
                          subCards={card.subCards}
                          columnId={id}
                          onVoteUp={() => backend.voteCard(refSpec, +1)}
                          onVoteDown={() => backend.voteCard(refSpec, -1)}
                          onMerge={(source, destination) =>
                            backend.addToOrCreateGroup(source, destination)
                          }
                          onMove={(oldRefSpec, newRefSpec) =>
                            backend.moveCard(oldRefSpec, newRefSpec)
                          }
                        />
                      )
                    })}
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
