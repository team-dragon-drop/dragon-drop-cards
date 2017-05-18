import React, { Component } from 'react';
import Column from './components/Column.js';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component {
  constructor() {
    super();
    this.state = {
        columns: [
          {
            name: "The Good",
            cards: [
              { name: "We shipped stuff" },
              { name: "Lots of cake!" },
              { name: "New team members" },
              { name: "Game of Thrones session" },
              { name: "We made lots of money" }
            ]
          },
          {
            name: "The Bad",
            cards: [
              { name: "STEVE O" },
              { name: "Refactoring the whole app is hard" },
              { name: "Finding time for pairing is hard with meetings, etc." },
              { name: "Build keeps breaking" },
              { name: "VC quality is not great" },
              { name: "VC quality is not great" },
              { name: "VC quality is not great" },
              { name: "VC quality is not great" }
            ]
          },
          {
            name: "The Questions",
            cards: [
              { name: "What is next for the project?" },
              { name: "How often should we do retros?" },
              { name: "Are there going to be anymore team changes before EOFY?" }
            ]
          }
        ]
      };
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
