import React from 'react';
import { DragSource } from 'react-dnd';
import RemoveCardButton from './RemoveCardButton';

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
    if (dropResult) props.moveCard(item.parentId, dropResult.id, item.id);
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
      <li
        key={this.props.key}
        id={this.props.id}
        className="card clearfix"
        onDoubleClick={() => {
          this.props.editCard(
            this.props.parentId,
            this.props.id,
            this.props.name
          );
        }}
      >

        <span>
          {this.props.name}
        </span>

        <RemoveCardButton
          removeCard={() => this.props.removeCard(this.props.parentId, this.props.id)}
        />
      </li>
    );
  }
}
export default DragSource("Card", cardSource, collect)(Card);
