import React from 'react';
import { DragSource } from 'react-dnd';
import { database } from 'firebase';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

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
      const refAdd = database().ref(`/-KkOZOdWvt73GuEUCYum/columns/${dropResult.id}/cards`).push();
      refAdd.set({
        name: item.name
      });

      const ref = database().ref(`/-KkOZOdWvt73GuEUCYum/columns/${item.parentId}/cards`);
      ref.child(item.id).remove();
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

        <span style={{ float: "left" }}>
          {this.props.name}
        </span>

        <span
          style={{ float: "right" }}
          onClick={() => this.props.removeCard(this.props.parentId, this.props.id)}
        >
          <CloseIcon className="card__close" />
        </span>
      </li>
    );
  }
}
export default DragSource("Card", cardSource, collect)(Card);
