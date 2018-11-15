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

  handleDragon(dragon) {
    console.log(dragon);

    const { destination, source, draggableId, combine, type } = dragon;

    // Combining cards
    if (combine) {
      console.log('COMBINE', source, destination);
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
      // return;
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

    // Persist ordering with columns
    if (type === 'column') {
      console.log('REORDER_COLUMN');
      return;
      // const newColumnOrder = Array.from(this.state.columnOrder);
      // newColumnOrder.splice(source.index, 1);
      // newColumnOrder.splice(destination.index, 0, draggableId);

      // const newState = {
      //   ...this.state,
      //   columnOrder: newColumnOrder,
      // };
      // this.setState(newState);
      // return;
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
      // return;
    }

    // const startCardIds = Array.from(start.cardIds);
    // startCardIds.splice(source.index, 1);
    // const newStart = {
    //   ...start,
    //   cardIds: startCardIds,
    // };

    // const finishCardIds = Array.from(finish.cardIds);
    // finishCardIds.splice(destination.index, 0, draggableId);
    // const newFinish = {
    //   ...finish,
    //   cardIds: finishCardIds,
    // };

    // const newState = {
    //   ...this.state,
    //   columns: {
    //     ...this.state.columns,
    //     [newStart.id]: newStart,
    //     [newFinish.id]: newFinish,
    //   },
    // };

    // this.setState(newState);
  }

  render() {
    return (
      <FirebaseProvider firebaseKey={this.props.boardId}>
        {(state, backend) => (
          <DragDropContext onDragEnd={this.handleDragon}>
            <Droppable direction="horizontal" droppableId="all-columns">
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="App"
                >
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
                      <Draggable draggableId={id} index={index}>
                        {provided => (
                          <Column
                            domRef={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={id}
                            id={id}
                            cards={state.columns[id].cards}
                            name={state.columns[id].name}
                            selected={index === this.state.selectedColumn}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
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
              )}
            </Droppable>
          </DragDropContext>
        )}
      </FirebaseProvider>
    );
  }
}
