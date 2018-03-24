import React from 'react'
import RemoveColumnButton from './RemoveColumnButton'

export default ({onDoubleClick, onRemove, canDrop, isOver, children}) => {
  let className = 'clearfix'
  if (canDrop) className += ' canDrop'
  if (isOver) className += ' isOver'

  return (
    <h2 className={className} onDoubleClick={onDoubleClick}>
      <span style={{float: 'left'}}> {children} </span>
      <RemoveColumnButton onClick={onRemove} />
    </h2>
  )
}
