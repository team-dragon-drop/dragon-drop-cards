import React from 'react';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { Card } from '../Card';
import { BackendActions } from '../../backend';
import Header from './Header';
import AddCardButton from './AddCardButton';
import ColumnHOC from './ColumnHOC';
import { sortCardsByVotes } from '../../utils';
import './styles.css';

const SelectedIndicator = () => (
  <KeyboardArrowDown color="#fff" className="column__selected-indicator" />
);

const Placeholder = () => (
  <li style={{ height: '40px', opacity: 0.5, backgroundColor: 'grey' }} />
);

const Column = ({
  id,
  name,
  cards,
  selected,
  connectDropTarget,
  isOver,
  canDrop,
}) => (
  <BackendActions>
    {backend => (
      <div className="column">
        {selected && <SelectedIndicator />}

        <Paper className="column-container">
          {connectDropTarget(
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
          )}

          <ul className="column__card-list">
            {sortCardsByVotes(cards).map(card => {
              return (
                <Card
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
            {isOver && canDrop && <Placeholder />}
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

export default ColumnHOC(Column);
