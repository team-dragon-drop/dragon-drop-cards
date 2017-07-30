import React, { Component } from 'react';
import Column from './Column';
import { database } from 'firebase';
import HTML5Backend from 'react-dnd-html5-backend';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { DragDropContext } from 'react-dnd';

class Board extends Component {
  componentDidMount(){
    database().ref(`/${this.props.boardId}/columns`).on('value', snapshot => {
      this.setState({
        columns: snapshot.val()
      });
    });
  }

  constructor() {
    super();
    this.state = {columns: []};
  }

  addCard(id){
    const content = prompt('Add Card');
    if(content){
      const ref = database().ref(`/${this.props.boardId}/columns/${id}/cards/`).push();
      ref.set({
        name: content
      });
    }
  }

  addColumn(){
    const content = prompt('Add Column');
    if(content){
      const ref = database().ref(`/${this.props.boardId}/columns`).push();
      ref.set({
        name: content
      });
    }
  }

  render() {
    let columns = null;
    const columnData = this.state.columns;
    if(columnData)
      columns = Object.keys(columnData).map(key => {
        return <Column
          key={key}
          id={key}
          cards={columnData[key].cards}
          name={columnData[key].name}
          addCard={()=>this.addCard(key)}
        />;
    });

    return (
      <div className="App">
        <AppBar
          title="Dragon Drop"
          showMenuIconButton={false}
          iconElementRight={
            <FlatButton onTouchTap={()=>this.addColumn()} label="Add Column" />
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
