import {DragSource, DropTarget} from 'react-dnd'

////////////////////////////////////////////////////////////////////////////////
// DRAGGABLE

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      name: props.name,
      votes: props.votes || 0,
      columnId: props.columnId,
      parentCardId: props.parentCardId,
      refSpec: {
        columnId: props.parentId,
        parentCardId: props.parentCardId,
        cardId: props.id,
      },
      subCards: props.subCards || [], // FIXME: Not actually an array
      type: 'card',
    }
  },

  endDrag(props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    if (!dropResult) return
    if (dropResult.type === 'card') {
      props.onMergeCard(item, dropResult)
    } else if (dropResult.type === 'column') {
      props.onMoveCard(item.parentId, dropResult.id, item.id)
    }
  },
}

function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

////////////////////////////////////////////////////////////////////////////////
// DROPPABLE

let canDropYN = true

const cardTarget = {
  drop(props) {
    return {
      id: props.id,
      name: props.name,
      votes: props.votes || 0,
      parentId: props.parentId,
      subCards: props.subCards || [], // FIXME: Not actually an array
      type: 'subcard',
    }
  },
  hover(props, monitor) {
    // Dont drop on your self! (not sure if this is needed)
    const item = monitor.getItem()
    canDropYN = item.id !== props.id
  },
  canDrop() {
    return canDropYN
  },
}

function targetCollect(connect, monitor) {
  return {
    connectDropTarget: x => x,
    isOver: monitor.isOver(),
    canDrop: false,
  }
}

////////////////////////////////////////////////////////////////////////////////

export default component =>
  DropTarget('SubCard', cardTarget, targetCollect)(
    DragSource('Card', cardSource, sourceCollect)(component),
  )
