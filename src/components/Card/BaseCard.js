import React from 'react'
import ThumbsUpIcon from 'material-ui/svg-icons/action/thumb-up'
import ThumbsDownIcon from 'material-ui/svg-icons/action/thumb-down'
import EditIcon from 'material-ui/svg-icons/image/edit'
import CollectionIcon from 'material-ui/svg-icons/file/folder'
import RemoveCardButton from '../RemoveCardButton'
import {BackendActions} from '../../backend'
import {SubCard} from '.'

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
    const {connectDropTarget, connectDragSource} = this.props
    const {key, id, subCards, name, parentId} = this.props
    const {onVoteUp, onVoteDown} = this.props

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
                  <ul
                    style={{display: subCards ? 'flex' : 'none'}}
                    className="card__subcards"
                  >
                    {subCards &&
                      Object.keys(subCards).map(subCardId => (
                        <SubCard
                          key={subCardId}
                          id={subCardId}
                          name={subCards[subCardId].name}
                          votes={subCards[subCardId].votes}
                          parentId={id}
                          onVoteUp={() =>
                            backend.voteCard(+1, parentId, id, subCardId)
                          }
                          onVoteDown={() =>
                            backend.voteCard(-1, parentId, id, subCardId)
                          }
                          onMoveCard={() => console.log('moving subcard')}
                        />
                      ))}
                  </ul>

                  <div className="card__actions">
                    <span onClick={e => onVoteUp()}>
                      <ThumbsUpIcon />
                    </span>

                    <span onClick={e => onVoteDown()}>
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
