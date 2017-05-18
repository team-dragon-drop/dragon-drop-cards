import React from 'react';
import { DropTarget } from 'react-dnd';
import AddButton from './AddButton';
import { database } from 'firebase';

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

  // handleAddCard(name){
  //   let ref = database().ref('/-KkOZOdWvt73GuEUCYum/columns').push();
  //   ref.set({
  //     name: name,
  //     cards: []
  //   })
  // }

  cardItems() {
    let cardData = this.props.cards;
    return Object.keys(cardData).map(key => {
      return <Card key={key} name={cardData[key].name} />;
    });
  }

  render() {
    return this.props.connectDropTarget(
      <div className="column">
        <h2>{this.props.name}</h2>
        <ul>{this.props.cards ? this.cardItems() : "nope"}</ul>
      </div>
    );
  }
};

export default DropTarget("Card", cardTarget, collect)(Column);
