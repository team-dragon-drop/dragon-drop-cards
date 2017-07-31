import React, { Component } from "react";
import Column from "./Column";
import { database } from "firebase";
import HTML5Backend from "react-dnd-html5-backend";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
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

  addColumn() {
    const content = prompt("Add Column");
    if (content) {
      database()
        .ref(`/${this.props.boardId}/columns`)
        .push()
        .set({ name: content });
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
      database().ref(`/${this.props.boardId}/columns/${columnId}/cards`)
        .child(id)
        .remove();
    }
  }

  moveCard(oldColumnId, newColumnId, id) {
    // TODO
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
            editColumn={(id, name) => this.editColumn(id, name)}
            removeColumn={(id) => this.removeColumn(id)}
            editCard={(columnId, id, name) => this.editCard(columnId, id, name)}
            removeCard={(columnId, id) => this.removeCard(columnId, id)}
          />
        );
      });

    return (
      <div className="App">
        <AppBar
          title="Dragon Drop"
          showMenuIconButton={false}
          iconElementRight={
            <FlatButton
              onTouchTap={() => this.addColumn()}
              label="Add Column"
            />
          }
        />
        <div className="columns">
          {columns}
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Board);
