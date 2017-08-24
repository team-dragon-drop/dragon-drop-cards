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

  addCard(id) {
    const content = prompt("Add Card");
    if (content) {
      database()
        .ref(`/${this.props.boardId}/columns/${id}/cards/`)
        .push()
        .set({ name: content });
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

  removeColumn(id) {
    if (confirm("You sure about this?")) {  // eslint-disable-line
      database()
        .ref(`/${this.props.boardId}/columns`)
        .child(id)
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

  removeCard(columnId, id) {
    if (confirm("You sure about this?")) { // eslint-disable-line
      database()
        .ref(`/${this.props.boardId}/columns/${columnId}/cards`)
        .child(id)
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
            addCard={() => this.addCard(key)}
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
