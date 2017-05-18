import React from 'react';
import { DropTarget } from 'react-dnd';

import Card from './Card';

const cardTarget = {
  drop(props) {
    return {
      id: props.id,
      name: props.name
    };
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    //canDrop: monitor.canDrop()
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
        <ul>{this.props.cards ? this.cardItems() : "nope"}</ul>
        <button onClick={()=>this.props.addCard()} style={{margin:'20px 0'}}>
          Add a card
        </button>
        {this.props.isOver && this.renderOverlay('black')}
      </div>
    );
  }

  renderOverlay(color) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }} />
    );
  }
};

export default DropTarget("Card", cardTarget, collect)(Column);
