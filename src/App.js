import React, { Component } from 'react';
import Column from './components/Column';
import { database } from 'firebase';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class App extends Component {
  componentDidMount(){
    var that = this;
    database().ref('/-KkOZOdWvt73GuEUCYum/columns').on('value', snapshot => {
      this.setState({
        columns: snapshot.val()
      });
      console.log(that.state);
    });

  }
  constructor() {
    super();
    this.state = {columns:[]};
  }

  render() {
    let columnData = this.state.columns;
    let columns = Object.keys(columnData).map(key => {
      return <Column
        key={key}
        id={key}
        cards={columnData[key].cards}
        name={columnData[key].name}
      />;
    });

    return (
        <div className="App">
          <header>
            <h1>Idea Boardz</h1>
          </header>
          <main>
            {columns}
          </main>
        </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
