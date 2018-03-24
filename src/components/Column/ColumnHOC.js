import {DropTarget} from 'react-dnd'

const cardTarget = {
  drop(props) {
    return {
      id: props.id,
      name: props.name,
      columnId: props.id,
      refSpec: {columnId: props.id},
      type: 'column',
    }
  },
  hover(props, monitor) {},
  canDrop(props, monitor) {
    const item = monitor.getItem()
    return item.type === 'subcard' || item.columnId !== props.id
  },
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

export default DropTarget('Card', cardTarget, collect)
