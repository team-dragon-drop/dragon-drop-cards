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
      const refAdd = database().ref(`/-KkOZOdWvt73GuEUCYum/columns/${dropResult.id}/cards`).push();
      refAdd.set({
        name: item.name
      });

      const refRemove = database().ref(`/-KkOZOdWvt73GuEUCYum/columns/${item.parentId}/cards`);
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
  editCard(columnId,id,content){
    const newContent = prompt('Edit content',content);
    if(newContent){
      const refEdit = database().ref(`/-KkOZOdWvt73GuEUCYum/columns/${columnId}/cards`);
      refEdit.child(id).set({
        name: newContent
      });
    }
  }

  removeCard(columnId,id){
    const ok = confirm("You sure about this?");
    if(ok){
      const refRemove = database().ref(`/-KkOZOdWvt73GuEUCYum/columns/${columnId}/cards`);
      refRemove.child(id).remove();
    }
  }

  render() {
    return this.props.connectDragSource(
      <li key={this.props.key} id={this.props.id} className="clearfix"  onDoubleClick={()=>this.editCard(this.props.parentId,this.props.id,this.props.name)}>
        <span style={{float:"left"}}>{this.props.name}</span>
        <span style={{float:"right"}} onClick={()=>this.removeCard(this.props.parentId,this.props.id)}>X</span>
      </li>
    );
  }
}

export default DragSource("Card", cardSource, collect)(Card);
