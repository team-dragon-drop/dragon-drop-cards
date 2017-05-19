import React, { Component } from 'react';
import Column from './components/Column';
import { database } from 'firebase';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class App extends Component {
  componentDidMount(){
    database().ref('/-KkOZOdWvt73GuEUCYum/columns').on('value', snapshot => {
      this.setState({
        columns: snapshot.val()
      });
    });
  }

  constructor() {
    super();
    this.state = {columns:[]};
  }

  handleAddCard(id){
    const content = prompt('Add a card');
    if(content){
      let ref = database().ref(`/-KkOZOdWvt73GuEUCYum/columns/${id}/cards/`).push();
      ref.set({
        name: content
      });
    }
  }

  render() {
    let columnData = this.state.columns;
    let columns = Object.keys(columnData).map(key => {
      return <Column
        key={key}
        id={key}
        cards={columnData[key].cards}
        name={columnData[key].name}
        addCard={()=>this.handleAddCard(key)}
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
