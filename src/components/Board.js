import React, { Component } from "react";
import Column from "./Column";
import { database } from "firebase";
import HTML5Backend from "react-dnd-html5-backend";
import AppBar from "./AppBar";
import { DragDropContext } from "react-dnd";

class Board extends Component {
  componentDidMount() {
    database().ref(`/${this.props.boardId}/columns`).on("value", snapshot => {
      this.setState({
        columns: snapshot.val()
      });
    });
  }

  constructor() {
    super();
    this.state = { columns: [] };
  }

  addCard(columnId, cardName) {
    if (columnId && cardName) {
      database()
        .ref(`/${this.props.boardId}/columns/${columnId}/cards/`)
        .push()
        .set({ name: cardName });
    }
  }

  addColumn(columnName) {
    if (columnName) {
      database()
        .ref(`/${this.props.boardId}/columns`)
        .push()
        .set({ name: columnName });
    }
  }

  removeColumn(columnId) {
    if (columnId) {
      database()
        .ref(`/${this.props.boardId}/columns`)
        .child(columnId)
        .remove();
    }
  }

  editColumn(id,content) {
    const newContent = prompt('Edit Column', content);
    if (newContent) {
      database()
        .ref(`/${this.props.boardId}/columns`)
        .child(id)
        .child("name")
        .set(newContent);
    }
  }

  editCard(columnId, id, content) {
    const newContent = prompt("Edit Card", content);
    if (newContent) {
      database()
        .ref(`/${this.props.boardId}/columns/${columnId}/cards`)
        .child(id)
        .set({ name: newContent });
    }
  }

  removeCard(columnId, cardId) {
    if (columnId && cardId) {
      database()
        .ref(`/${this.props.boardId}/columns/${columnId}/cards`)
        .child(cardId)
        .remove();
    }
  }

  moveCard(oldColumnId, newColumnId, id) {
    let newRef = database()
      .ref(`/${this.props.boardId}/columns/${newColumnId}/cards`)
      .push()

    let oldRef = database()
      .ref(`/${this.props.boardId}/columns/${oldColumnId}/cards`)
      .child(id)

    oldRef.once("value", function(snap) {
      newRef.set(snap.val(), function(error) {
        !error ? oldRef.remove() : console.error(error);
      });
    });
  }

  render() {
    let columns = null;
    const columnData = this.state.columns;
    if (columnData)
      columns = Object.keys(columnData).map(key => {
        return (
          <Column
            key={key}
            id={key}
            cards={columnData[key].cards}
            name={columnData[key].name}
            addCard={(name) => this.addCard(key, name)}
            editCard={(columnId, id, name) => this.editCard(columnId, id, name)}
            removeCard={(columnId, id) => this.removeCard(columnId, id)}
            moveCard={(oldColumnId, newColumnId, id) => this.moveCard(oldColumnId, newColumnId, id)}
            editColumn={(id, name) => this.editColumn(id, name)}
            removeColumn={(id) => this.removeColumn(id)}
          />
        );
      });

    return (
      <div className="App">
        <AppBar
          buttonLabel="Add Column"
          onButtonTouchTap={(columnName) => this.addColumn(columnName)}
        />
        <div className="columns">
          {columns}
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Board);
