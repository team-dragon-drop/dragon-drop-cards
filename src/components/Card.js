import React from 'react'
import {DragSource, DropTarget} from 'react-dnd'
import RemoveCardButton from './RemoveCardButton'
import ThumbsUpIcon from 'material-ui/svg-icons/action/thumb-up'
import ThumbsDownIcon from 'material-ui/svg-icons/action/thumb-down'
import EditIcon from 'material-ui/svg-icons/image/edit'
import CollectionIcon from 'material-ui/svg-icons/file/folder'
import SubCard from './SubCard'
import {BackendActions} from '../backend'

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      name: props.name,
      votes: props.votes || 0,
      parentId: props.parentId,
      subCards: props.subCards || [], // FIXME: Not actually an array
      type: 'card',
    }
  },

  endDrag(props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    if (!dropResult) return
    if (dropResult.type === 'card') {
      props.onMergeCard(item, dropResult)
    } else if (dropResult.type === 'column') {
      props.onMoveCard(item.parentId, dropResult.id, item.id)
    }
  },
}

function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

////////////////////////////////////////////////////////////////////////////////

let canDropYN = true

const cardTarget = {
  drop(props) {
    return {
      id: props.id,
      name: props.name,
      votes: props.votes || 0,
      parentId: props.parentId,
      subCards: props.subCards || [], // FIXME: Not actually an array
      type: 'card',
    }
  },
  hover(props, monitor) {
    // Dont drop on your self! (not sure if this is needed)
    const item = monitor.getItem()
    canDropYN = item.id !== props.id
  },
  canDrop() {
    return canDropYN
  },
}

function targetCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

////////////////////////////////////////////////////////////////////////////////

class Card extends React.Component {
  state = {
    expanded: false,
  }

  subCards() {
    const {subCards} = this.props
    if (!subCards) return
    return Object.keys(subCards).map(key => (
      <SubCard
        key={key}
        name={subCards[key].name}
        votes={subCards[key].votes}
      />
    ))
  }

  votes() {
    const {votes, subCards} = this.props
    let total = votes || 0

    if (subCards) {
      Object.keys(subCards).forEach(x => {
        total += subCards[x].votes
      })
    }

    return (
      <span
        className="card__votes"
        style={{display: total !== 0 ? 'inline-block' : 'none'}}
      >
        {total > 0 ? `+${total}` : `${total}`}
      </span>
    )
  }

  render() {
    const {connectDropTarget, connectDragSource} = this.props
    const {key, id, subCards, name, parentId} = this.props

    return (
      <BackendActions>
        {backend =>
          connectDropTarget(
            connectDragSource(
              <li key={key} id={id} className="card">
                <div
                  className="card__head"
                  onClick={() => {
                    this.setState({
                      ...this.state,
                      expanded: !this.state.expanded,
                    })
                  }}
                >
                  <div className="card__info">
                    {subCards && (
                      <span className="card__icon">
                        <CollectionIcon />
                      </span>
                    )}
                    <span>{name}</span>
                  </div>
                  <div>{this.votes()}</div>
                </div>

                <div
                  className="card__drawer"
                  style={{display: this.state.expanded ? 'flex' : 'none'}}
                >
                  <div
                    style={{display: this.subCards() ? 'flex' : 'none'}}
                    className="card__subcards"
                  >
                    {this.subCards()}
                  </div>

                  <div className="card__actions">
                    <span onClick={e => backend.voteUpCard(parentId, id)}>
                      <ThumbsUpIcon />
                    </span>

                    <span onClick={e => backend.voteDownCard(parentId, id)}>
                      <ThumbsDownIcon />
                    </span>

                    <span onClick={e => backend.editCard(parentId, id, name)}>
                      <EditIcon />
                    </span>

                    <RemoveCardButton
                      removeCard={() => backend.removeCard(parentId, id)}
                    />
                  </div>
                </div>
              </li>,
            ),
          )
        }
      </BackendActions>
    )
  }
}

const CardDragSource = DragSource('Card', cardSource, sourceCollect)(Card)

export default DropTarget('Card', cardTarget, targetCollect)(CardDragSource)
