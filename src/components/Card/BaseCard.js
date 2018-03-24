import React from 'react'
import ThumbsUpIcon from 'material-ui/svg-icons/action/thumb-up'
import ThumbsDownIcon from 'material-ui/svg-icons/action/thumb-down'
import EditIcon from 'material-ui/svg-icons/image/edit'
import CollectionIcon from 'material-ui/svg-icons/file/folder'
import RemoveCardButton from '../RemoveCardButton'
import {BackendActions} from '../../backend'
import {SubCard} from '.'
import './styles.css'

export default class BaseCard extends React.Component {
  state = {
    expanded: false,
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
    const {connectDropTarget, connectDragSource, canDrop, isOver} = this.props
    const {key, id, subCards, name, columnId, parentCardId} = this.props

    const refSpec = parentCardId
      ? {columnId: columnId, cardId: parentCardId, subCardId: id}
      : {columnId: columnId, cardId: id}

    let className = 'card'
    if (canDrop) className += ' card--can-drop'
    if (isOver) className += ' card--is-over'

    return (
      <BackendActions>
        {backend =>
          connectDropTarget(
            connectDragSource(
              <li key={key} id={id} className={className}>
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
                  <ul
                    style={{display: subCards ? 'flex' : 'none'}}
                    className="card__subcards"
                  >
                    {subCards &&
                      Object.keys(subCards)
                        .map(id => ({...subCards[id], id}))
                        .sort((a, b) => (a.votes || 0) < (b.votes || 0))
                        .map(subCard => {
                          return (
                            <SubCard
                              key={subCard.id}
                              id={subCard.id}
                              name={subCard.name}
                              votes={subCard.votes}
                              columnId={columnId}
                              parentCardId={id}
                              onMerge={(source, destination) =>
                                backend.addToOrCreateGroup(source, destination)
                              }
                              onMove={(oldRefSpec, newRefSpec) =>
                                backend.moveCard(oldRefSpec, newRefSpec)
                              }
                            />
                          )
                        })}
                  </ul>

                  <div className="card__actions">
                    <span onClick={e => backend.voteCard(refSpec, +1)}>
                      <ThumbsUpIcon />
                    </span>

                    <span onClick={e => backend.voteCard(refSpec, -1)}>
                      <ThumbsDownIcon />
                    </span>

                    <span onClick={e => backend.editCard(columnId, id, name)}>
                      <EditIcon />
                    </span>

                    <RemoveCardButton
                      removeCard={() => backend.removeCard(refSpec)}
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
