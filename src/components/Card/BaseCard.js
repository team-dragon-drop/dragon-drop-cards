import React from 'react'
import ThumbsUpIcon from 'material-ui/svg-icons/action/thumb-up'
import ThumbsDownIcon from 'material-ui/svg-icons/action/thumb-down'
import CollectionIcon from 'material-ui/svg-icons/file/folder'
import ReactMarkdown from 'react-markdown'
import RemoveCardButton from '../RemoveCardButton'
import EditCardButton from '../EditCardButton'
import {BackendActions} from '../../backend'
import {sortCardsByVotes} from '../../utils'
import {SubCard} from '.'
import {TweenMax} from 'gsap'
import './styles.css'
import 'github-markdown-css'

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

    const animate = (cardId, isUp) => {
      const className = isUp ? ".card__thumbsup" : ".card__thumbsdown"
      const color = isUp ? "#9acd32" : "#dc1f1f";
      const direction = isUp ? -10 : 10;
      TweenMax.to([`#${cardId} ${className}`, `#${cardId} .card__votes`], .1, {y:direction, color: color, rotation: -20});
      TweenMax.to([`#${cardId} ${className}`, `#${cardId} .card__votes`], .1, {y:0, color: "#d3d3d3", rotation: 0, delay: .3});
    }

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
                    <ReactMarkdown
                      source={name}
                      className="markdown-body card__markdown"
                    />
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
                    {sortCardsByVotes(subCards).map(subCard => {
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
                    <span onClick={(e) => {
                        backend.voteCard(refSpec, +1)
                        animate(refSpec.cardId, true);
                    }}>
                      <ThumbsUpIcon style={{color: "#d3d3d3"}} className={"card__thumbsup"} />
                    </span>

                    <span onClick={e => {
                      backend.voteCard(refSpec, -1)
                      animate(refSpec.cardId, false);
                    }}>
                      <ThumbsDownIcon style={{color: "#d3d3d3"}} className={"card__thumbsdown"}/>
                    </span>

                    <EditCardButton
                      currentValue={name}
                      onSubmit={newContent =>
                        backend.editCard(refSpec, newContent)
                      }
                    />

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
