import React, { Component } from 'react';
import { connect } from 'react-redux';

import Column from './components/Column.js';
import { addColumn } from './actions/index.js';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component {
  render() {
    let columns = this.props.columns.map((column, i) => {
      return <Column key={i} data={column} />;
    });

    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className="App">
          <header>
            <h1>Idea Boardz</h1>
          </header>
          <main>
            {columns}
            <button onClick={this.props.onAddColumn}>Add column</button>
          </main>
        </div>
      </DragDropContextProvider>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    columns: state.columns
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAddColumn: () => {
      dispatch(addColumn("test"));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
