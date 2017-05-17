import React from 'react';
import { DropTarget } from 'react-dnd';

import Card from './Card';

const cardTarget = {
  drop(props) {
    return { name: props.data.name };
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
  render() {
    let cardItems = this.props.data.cards.map((card, i) => {
      return <Card key={i} name={card.name} />;
    });

    return this.props.connectDropTarget(
      <div className="column">
        <h2>{this.props.data.name}</h2>
        <ul>{cardItems}</ul>
        <div className="add-card-placeholder">
          <a href="#">Add a card...</a>
        </div>
      </div>
    );
  }
};

export default DropTarget("Card", cardTarget, collect)(Column);
