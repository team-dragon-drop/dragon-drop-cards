import React from 'react';
import { DragSource } from 'react-dnd';
import { database } from 'firebase';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      name: props.name,
      parentId: props.parentId
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      let refAdd = database().ref(`/-KkOZOdWvt73GuEUCYum/columns/${dropResult.id}/cards`).push();
      refAdd.set({
        name: item.name
      });

      let refRemove = database().ref(`/-KkOZOdWvt73GuEUCYum/columns/${item.parentId}/cards`);
      refRemove.child(item.id).remove();
    }
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Card extends React.Component {
  render() {
    return this.props.connectDragSource(
      <li key={this.props.key} id={this.props.id}>{this.props.name}</li>
    );
  }
}

export default DragSource("Card", cardSource, collect)(Card);
