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
    if (dropResult.type === 'card' || dropResult.type === 'group') {
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
  hover(props, monitor) {},
  canDrop(props, monitor) {
    const item = monitor.getItem()
    return item.type !== 'group' && item.id !== props.id
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
