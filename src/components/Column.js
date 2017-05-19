import React from 'react';
import { DropTarget } from 'react-dnd';
import { database } from 'firebase';

import Card from './Card';

let canDropYN = true;

const cardTarget = {
  drop(props) {
    return {
      id: props.id,
      name: props.name
    };
  },
  hover(props, monitor) {
    const item = monitor.getItem();
    canDropYN = (item.parentId === props.id) ? false : true;
    document.getElementById(item.id).style.display = canDropYN ? 'none' : 'block';
  },
  canDrop() {
    return canDropYN;
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class Column extends React.Component {
  cardItems() {
    const cardData = this.props.cards;
    return Object.keys(cardData).map(key => {
      return <Card key={key} name={cardData[key].name} id={key} parentId={this.props.id} />;
    });
  }

  renderPlaceholder() {
    return (
      <li style={{
        height:"40px",
        opacity: 0.5,
        backgroundColor: "green",
      }} ></li>
    );
  }

  removeColumn(id){
    const ok = confirm("You sure about this?");
    if(ok){
      const ref = database().ref(`/-KkOZOdWvt73GuEUCYum/columns`);
      ref.child(id).remove();
    }
  }

  editColumn(id,content){
    const newContent = prompt('Edit Column',content);
    if(newContent){
      const ref = database().ref(`/-KkOZOdWvt73GuEUCYum/columns`);
      ref.child(id).child("name").set(newContent);
    }
  }

  render() {
    return this.props.connectDropTarget(
      <div className="column">
        <h2 className="clearfix" onDoubleClick={()=>this.editColumn(this.props.id,this.props.name)}>
          <span style={{float:"left"}}>{this.props.name}</span>
          <span style={{float:"right"}} onClick={()=>this.removeColumn(this.props.id)}>X</span>
        </h2>
        <ul>
          {this.props.cards ? this.cardItems() : ""}
          {this.props.isOver && this.props.canDrop && this.renderPlaceholder()}
        </ul>
        <button onClick={()=>this.props.addCard()} style={{
            margin:'20px 0',
            padding:'10px',
            fontSize:'14px',
            background:'#000',
            color:'#fff',
            border:'none'}}>
          + Add Card
        </button>
      </div>
    );
  }
};

export default DropTarget("Card", cardTarget, collect)(Column);
