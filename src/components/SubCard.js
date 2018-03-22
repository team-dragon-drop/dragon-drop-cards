import React from 'react'
import {DragSource} from 'react-dnd'
import RemoveCardButton from './RemoveCardButton'
import ThumbsUpIcon from 'material-ui/svg-icons/action/thumb-up'
import ThumbsDownIcon from 'material-ui/svg-icons/action/thumb-down'
import EditIcon from 'material-ui/svg-icons/image/edit'
import CollectionIcon from 'material-ui/svg-icons/file/folder'

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      name: props.name,
      parentId: props.parentId,
    }
  },

  endDrag(props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    if (!dropResult) return
    if (dropResult.type === 'card') {
      props.mergeCard(item, dropResult)
    } else if (dropResult.type === 'column') {
      props.moveCard(item.parentId, dropResult.id, item.id)
    }
  },
}

function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

class SubCard extends React.Component {
  state = {
    expanded: false,
  }

  render() {
    const hasVotes =
      Number.isInteger(this.props.votes) && this.props.votes !== 0

    return this.props.connectDragSource(
      <div key={this.props.key} id={this.props.id} className="card__subcard">
        <div
          className="card__head"
          onClick={() => {
            this.setState({...this.state, expanded: !this.state.expanded})
          }}
        >
          <div className="card__info">
            {this.props.subCards && (
              <span className="card__icon">
                <CollectionIcon />
              </span>
            )}
            <span>{this.props.name}</span>
          </div>
          <div>
            <span
              className="card__votes"
              style={{display: hasVotes ? 'inline-block' : 'none'}}
            >
              {this.props.votes > 0
                ? `+${this.props.votes}`
                : `${this.props.votes}`}
            </span>
          </div>
        </div>

        <div
          style={{display: this.state.expanded ? 'inline-flex' : 'none'}}
          className="card__actions"
        >
          <span
            onClick={e => {
              this.props.voteUp(this.props.parentId, this.props.id)
            }}
          >
            <ThumbsUpIcon />
          </span>

          <span
            onClick={e => {
              this.props.voteDown(this.props.parentId, this.props.id)
            }}
          >
            <ThumbsDownIcon />
          </span>

          <span
            onClick={e => {
              this.props.editCard(
                this.props.parentId,
                this.props.id,
                this.props.name,
              )
            }}
          >
            <EditIcon />
          </span>

          <RemoveCardButton
            removeCard={() =>
              this.props.removeCard(this.props.parentId, this.props.id)
            }
          />
        </div>
      </div>,
    )
  }
}

export default DragSource('Card', cardSource, sourceCollect)(SubCard)
