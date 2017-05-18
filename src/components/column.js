import React from 'react';
import { DropTarget } from 'react-dnd';

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
    if(canDropYN)
    document.getElementById(item.id).style.display = 'none';
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
    let cardData = this.props.cards;
    return Object.keys(cardData).map(key => {
      return <Card key={key} name={cardData[key].name} id={key} parentId={this.props.id} />;
    });
  }

  render() {
    return this.props.connectDropTarget(
      <div className="column">
        <h2>{this.props.name}</h2>
        <ul>
          {this.props.cards ? this.cardItems() : "nope"}
          {this.props.isOver && this.props.canDrop && this.renderPlaceholder()}
        </ul>
        <button onClick={()=>this.props.addCard()} style={{
            margin:'20px 0',
            padding:'10px',
            fontSize:'14px',
            background:'#000',
            color:'#fff',
            border:'none'}}>
          Add a card
        </button>
      </div>
    );
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
};

export default DropTarget("Card", cardTarget, collect)(Column);
