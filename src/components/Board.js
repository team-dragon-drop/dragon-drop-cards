import React, { Component } from "react";
import Column from "./Column";
import HTML5Backend from "react-dnd-html5-backend";
import AppBar from "./AppBar";
import { DragDropContext } from "react-dnd";
import backend from "../backend";

class Board extends Component {
  constructor() {
    super();
    this.state = { loading: true, columns: [] };
  }

  componentDidMount() {
    backend.init(this.props.boardId, (val) => {
      this.setState({
        loading: false,
        columns: val
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
            addCard={(name) => backend.addCard(key, name)}
            editCard={(columnId, id, name) => backend.editCard(columnId, id, name)}
            removeCard={(columnId, id) => backend.removeCard(columnId, id)}
            moveCard={(oldColumnId, newColumnId, id) => backend.moveCard(oldColumnId, newColumnId, id)}
            editColumn={(id, name) => backend.editColumn(id, name)}
            removeColumn={(id) => backend.removeColumn(id)}
          />
        );
      });

    return (
      <div className="App">
        <AppBar
          buttonLabel="Add Column"
          onButtonTouchTap={(columnName) => backend.addColumn(columnName)}
          loading={this.state.loading}
        />
        <div className="columns">
          {columns}
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Board);
