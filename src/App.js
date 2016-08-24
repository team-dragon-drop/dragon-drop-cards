import React, { Component } from 'react';
import { connect } from 'react-redux';

import Column from './components/Column.js';
import { addColumn } from './actions/index.js';

class App extends Component {
  render() {
    let columns = this.props.columns.map((column, i) => {
      return <Column key={i} data={column} />;
    });

    return (
      <div className="App">
        <header>
          <h1>Idea Boardz</h1>
        </header>
        <main>
          {columns}
          <button onClick={this.props.onAddColumn}>Add column</button>
        </main>
      </div>
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
