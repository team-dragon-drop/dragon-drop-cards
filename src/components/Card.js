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
  editCard(columnId,id,content){
    const newContent = prompt('Edit Card',content);
    if(newContent){
      const ref = database().ref(`/-KkOZOdWvt73GuEUCYum/columns/${columnId}/cards`);
      ref.child(id).set({
        name: newContent
      });
    }
  }

  removeCard(columnId,id){
    const ok = confirm("You sure about this?");  // eslint-disable-line
    if(ok){
      const ref = database().ref(`/-KkOZOdWvt73GuEUCYum/columns/${columnId}/cards`);
      ref.child(id).remove();
    }
  }

  render() {
    return this.props.connectDragSource(
      <li key={this.props.key} id={this.props.id} className="card clearfix"  onDoubleClick={()=>this.editCard(this.props.parentId,this.props.id,this.props.name)}>
        <span style={{float:"left"}}>{this.props.name}</span>
        <span style={{float:"right"}} onClick={()=>this.removeCard(this.props.parentId,this.props.id)}>
          <CloseIcon className="card__close" /></span>
      </li>
    );
  }
}

export default DragSource("Card", cardSource, collect)(Card);
