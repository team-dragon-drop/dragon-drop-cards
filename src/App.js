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
    const content = prompt('Add Card');
    if(content){
      const ref = database().ref(`/-KkOZOdWvt73GuEUCYum/columns/${id}/cards/`).push();
      ref.set({
        name: content
      });
    }
  }

  addColumn(){
    const content = prompt('Add Column');
    if(content){
      const ref = database().ref(`/-KkOZOdWvt73GuEUCYum/columns`).push();
      ref.set({
        name: content
      });
    }
  }

  render() {
    const columnData = this.state.columns;
    const columns = Object.keys(columnData).map(key => {
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
            <h1 style={{float:"left"}}>Idea Boardz</h1>
            <button onClick={()=>this.addColumn()} style={{
                padding:"15px",
                fontSize:"14px",
                background:"#000",
                color:"#fff",
                border:"none",
                float:"right"}}>
              + Add Column
            </button>
          </header>
          <main>
            {columns}
          </main>
        </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
