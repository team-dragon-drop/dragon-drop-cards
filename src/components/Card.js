import React from 'react';
import { DragSource } from 'react-dnd';

const cardSource = {
  beginDrag(props) {
    return { name: props.name };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      window.alert(
        `You dropped ${item.name} into ${dropResult.name}!`,
      );
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
      <li key={this.props.key}>{this.props.name}</li>
    );
  }
}

export default DragSource("Card", cardSource, collect)(Card);
