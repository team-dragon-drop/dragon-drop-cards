import React, { Component } from 'react';
import Column from './components/Column.js';
import { database } from 'firebase';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component {
  componentDidMount(){
    let ref = database().ref('/-KkOZOdWvt73GuEUCYum/columns').on('value', snapshot => {
      console.log("Stuff", snapshot.val());
      this.setState({
        columns: snapshot.val()
      });
    });

  }
  constructor() {
    super();
    this.state = {columns:[]};

  }

  render() {

    let columns = this.state.columns.map((column, i) => {
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
          </main>
        </div>
      </DragDropContextProvider>
    );
  }
}

export default App;
