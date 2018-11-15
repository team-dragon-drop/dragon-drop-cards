import React from 'react';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Card from '../Card/BaseCard';
import { BackendActions } from '../../backend';
import Header from './Header';
import AddCardButton from './AddCardButton';
import { sortCardsByVotes } from '../../utils';
import { Droppable } from 'react-beautiful-dnd';
import './styles.css';

const SelectedIndicator = () => (
  <KeyboardArrowDown color="#fff" className="column__selected-indicator" />
);

const Placeholder = () => (
  <li style={{ height: '40px', opacity: 0.5, backgroundColor: 'grey' }} />
);

export default ({
  id,
  domRef,
  name,
  cards,
  selected,
  isOver,
  canDrop,
  ...props
}) => (
  <BackendActions>
    {backend => (
      <div className="column" ref={domRef} {...props}>
        {selected && <SelectedIndicator />}

        <Paper className="column-container">
          <div>
            <Header
              onDoubleClick={() => backend.editColumn(id, name)}
              onRemove={() => backend.removeColumn(id)}
              canDrop={canDrop}
              isOver={isOver}
            >
              {name}
            </Header>
          </div>
          <ul className="column__card-list">
            {sortCardsByVotes(cards).map((card, index) => {
              return (
                <Card
                  index={index}
                  key={card.id}
                  id={card.id}
                  name={card.name}
                  votes={card.votes}
                  subCards={card.subCards}
                  columnId={id}
                  onMerge={(source, destination) =>
                    backend.addToOrCreateGroup(source, destination)
                  }
                  onMove={(oldRefSpec, newRefSpec) =>
                    backend.moveCard(oldRefSpec, newRefSpec)
                  }
                />
              );
            })}
          </ul>
          <AddCardButton
            keyboardShortcutsActive={selected}
            onSubmit={newCardName => backend.addCard(id, newCardName)}
          />
        </Paper>
      </div>
    )}
  </BackendActions>
);
