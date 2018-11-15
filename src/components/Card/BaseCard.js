import React from 'react';
import ThumbsUpIcon from '@material-ui/icons/ThumbUp';
import ThumbsDownIcon from '@material-ui/icons/ThumbDown';
import CollectionIcon from '@material-ui/icons/Folder';
import ReactMarkdown from 'react-markdown';
import RemoveCardButton from '../RemoveCardButton';
import EditCardButton from '../EditCardButton';
import { BackendActions } from '../../backend';
import { sortCardsByVotes } from '../../utils';
import { TweenMax } from 'gsap';
import { Draggable } from 'react-beautiful-dnd';
import './styles.css';
import 'github-markdown-css';

export default class BaseCard extends React.Component {
  state = {
    expanded: false,
  };

  votes() {
    const { votes, subCards } = this.props;
    let total = votes || 0;

    if (subCards) {
      Object.keys(subCards).forEach(x => {
        total += subCards[x].votes;
      });
    }

    return (
      <span
        className="card__votes"
        style={{ display: total !== 0 ? 'inline-block' : 'none' }}
      >
        {total > 0 ? `+${total}` : `${total}`}
      </span>
    );
  }

  render() {
    const { canDrop, isOver } = this.props;
    const { id, subCards, name, columnId, parentCardId } = this.props;

    const refSpec = parentCardId
      ? { columnId: columnId, cardId: parentCardId, subCardId: id }
      : { columnId: columnId, cardId: id };

    let className = 'card';
    if (canDrop) className += ' card--can-drop';
    if (isOver) className += ' card--is-over';

    const animate = (cardId, isUp) => {
      const className = isUp ? '.card__thumbsup' : '.card__thumbsdown';
      const color = isUp ? '#9acd32' : '#dc1f1f';
      const direction = isUp ? -10 : 10;
      TweenMax.to([`#${cardId} ${className}`, `#${cardId} .card__votes`], 0.1, {
        y: direction,
        color: color,
        rotation: -20,
      });
      TweenMax.to([`#${cardId} ${className}`, `#${cardId} .card__votes`], 0.1, {
        y: 0,
        color: '#d3d3d3',
        rotation: 0,
        delay: 0.3,
      });
    };

    return (
      <BackendActions>
        {backend => (
          <Draggable index={this.props.index} draggableId={id}>
            {(provided, snapshot) => (
              <li id={id} className={className}>
                <div
                  ref={provided.innerRef}
                  {...provided.dragHandleProps}
                  className="card__head"
                  onClick={() => {
                    this.setState({
                      ...this.state,
                      expanded: !this.state.expanded,
                    });
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
                  style={{ display: this.state.expanded ? 'flex' : 'none' }}
                >
                  <ul
                    style={{ display: subCards ? 'flex' : 'none' }}
                    className="card__subcards"
                  />

                  <div className="card__actions">
                    <span
                      onClick={e => {
                        backend.voteCard(refSpec, +1);
                        animate(refSpec.cardId, true);
                      }}
                    >
                      <ThumbsUpIcon
                        style={{ color: '#d3d3d3' }}
                        className={'card__thumbsup'}
                      />
                    </span>

                    <span
                      onClick={e => {
                        backend.voteCard(refSpec, -1);
                        animate(refSpec.cardId, false);
                      }}
                    >
                      <ThumbsDownIcon
                        style={{ color: '#d3d3d3' }}
                        className={'card__thumbsdown'}
                      />
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
              </li>
            )}
          </Draggable>
        )}
      </BackendActions>
    );
  }
}
