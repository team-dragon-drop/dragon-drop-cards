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
      refSpec: {columnId: props.columnId, cardId: props.id},
      subCards: props.subCards,
      type: props.subCards ? 'group' : 'card',
    }
  },

  endDrag(props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    if (!dropResult) return
    if (
      item.type !== 'group' &&
      (dropResult.type === 'card' || dropResult.type === 'group')
    ) {
      props.onMerge(item, dropResult)
    } else if (dropResult.type === 'column') {
      props.onMove(item.refSpec, dropResult.refSpec)
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

let canDrop = true

const cardTarget = {
  drop(props) {
    return {
      id: props.id,
      name: props.name,
      votes: props.votes || 0,
      columnId: props.columnId,
      refSpec: {columnId: props.columnId, cardId: props.id},
      subCards: props.subCards,
      type: props.subCards ? 'group' : 'card',
    }
  },
  hover(props, monitor) {
    // Dont drop on your self! (not sure if this is needed)
    const item = monitor.getItem()
    canDrop = item.id !== props.id
  },
  canDrop() {
    return canDrop
  },
}

function targetCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

////////////////////////////////////////////////////////////////////////////////

export default component =>
  DropTarget('Card', cardTarget, targetCollect)(
    DragSource('Card', cardSource, sourceCollect)(component),
  )
