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
        columnId: props.columnId,
        cardId: props.parentCardId,
        subCardId: props.id,
      },
      subCards: props.subCards,
      type: 'subcard',
    }
  },

  endDrag(props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    if (!dropResult) return
    if (
      dropResult.type === 'card' ||
      (dropResult.type === 'group' && dropResult.id !== item.parentCardId)
    ) {
      props.onMergeCard(item, dropResult)
    } else if (dropResult.type === 'column') {
      props.onMoveCard(item.refSpec, dropResult.refSpec)
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
      subCards: props.subCards || [], // FIXME: Not actually an array
      type: 'subcard',
    }
  },
  hover(props, monitor) {},
  canDrop() {
    return false
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
