import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Column from './Column';
import AppBar from './AppBar';
import { FirebaseProvider } from '../backend';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { clamp } from '../utils';
import logo from './Home/dragon-drop-logo.svg';

export default class Board extends Component {
  state = { selectedColumn: null };

  incrementColumn(columns, increment) {
    const { selectedColumn } = this.state;
    const target = selectedColumn === null ? 0 : selectedColumn + increment;
    const range = [0, Object.keys(columns).length - 1];
    this.setState({ selectedColumn: clamp(target, range) });
  }

  clearSelectedColumn() {
    this.setState({ selectedColumn: null });
  }

  handleDragon(dragon, backend, state) {
    console.log(dragon);

    const { destination, source, draggableId, combine, type } = dragon;

    // Combining cards
    if (combine) {
      console.log('COMBINE', dragon);

      const card = {
        ...state.columns[dragon.source.droppableId].cards[dragon.draggableId],
        refSpec: {
          columnId: dragon.source.droppableId,
          cardId: dragon.draggableId,
        },
      };

      const group = {
        ...state.columns[dragon.combine.droppableId].cards[
          dragon.combine.draggableId
        ],
        refSpec: {
          columnId: dragon.combine.droppableId,
          cardId: dragon.combine.draggableId,
        },
      };

      backend.addToOrCreateGroup(card, group);
      // const cards = [...start.cardIds];
      // cards.splice(source.index, 1);

      // const newCards = {
      //   ...start,
      //   cardIds: cards,
      // };

      // const content = `${
      //   this.state.cards[combine.draggableId].content
      // } \n ${this.state.cards[draggableId].content}`;

      // this.setState({
      //   ...this.state,
      //   cards: {
      //     ...this.state.cards,
      //     [combine.draggableId]: {
      //       id: combine.draggableId,
      //       content: content,
      //     },
      //   },
      //   columns: {
      //     ...this.state.columns,
      //     [source.droppableId]: newCards,
      //   },
      // });
      return;
    }

    // const finish = this.state.columns[destination.droppableId];

    //If you drop it out of bounds
    if (!destination) {
      console.log('OUT_OF_BOUNDS');
      return;
    }

    //If you drop in the same spot
    if (
      destination.droppableId == source.droppableId &&
      destination.index === source.index
    ) {
      console.log('SAME_CARD');
      return;
    }

    // Reordering within same column
    if (source.droppableId === destination.droppableId) {
      console.log('REORDER_CARD');
      // const newCardIds = Array.from(start.cardIds);
      // newCardIds.splice(source.index, 1);
      // newCardIds.splice(destination.index, 0, draggableId);

      // const newColumn = {
      //   ...start,
      //   cardIds: newCardIds,
      // };

      // const newState = {
      //   ...this.state,
      //   columns: {
      //     ...this.state.columns,
      //     [newColumn.id]: newColumn,
      //   },
      // };

      // this.setState(newState);
      return;
    }

    console.log('COLUMN_CHANGE');
    console.log(dragon);
    const card = {
      columnId: dragon.source.droppableId,
      cardId: dragon.draggableId,
    };
    const newColumn = { columnId: dragon.destination.droppableId };
    backend.moveCard(card, newColumn);
  }

  render() {
    return (
      <FirebaseProvider firebaseKey={this.props.boardId}>
        {(state, backend) => (
          <DragDropContext
            onDragEnd={dragon => this.handleDragon(dragon, backend, state)}
          >
            <div className="App">
              <Helmet>
                <title>{`Dragon Drop Cards – ${state.name}`}</title>
                <meta
                  property="og:title"
                  content={`Dragon Drop Cards – ${state.name}`}
                />
                <meta
                  property="og:description"
                  content="Create actions and items for your board here."
                />
                <meta property="og:image" content={logo} />
                <meta name="robots" content="noindex, nofollow" />
              </Helmet>
              <AppBar
                onClick={columnName => backend.addColumn(columnName)}
                loading={state.loading}
              />

              <h2 className="board-title">{state.name}</h2>

              <div className="columns">
                {Object.keys(state.columns).map((id, index) => (
                  <Column
                    key={id}
                    id={id}
                    cards={state.columns[id].cards}
                    name={state.columns[id].name}
                    selected={index === this.state.selectedColumn}
                  />
                ))}
              </div>

              <KeyboardShortcuts
                keys={{
                  27: () => this.clearSelectedColumn(null), // ESC
                  37: () => this.incrementColumn(state.columns, -1), // Left
                  39: () => this.incrementColumn(state.columns, +1), // Right
                  72: () => this.incrementColumn(state.columns, -1), // h
                  76: () => this.incrementColumn(state.columns, +1), // l
                }}
              />
            </div>
          </DragDropContext>
        )}
      </FirebaseProvider>
    );
  }
}
