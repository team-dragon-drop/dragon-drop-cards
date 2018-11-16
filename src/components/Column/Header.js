import React from 'react';
import RemoveColumnButton from './RemoveColumnButton';

export default ({ onDoubleClick, onRemove, canDrop, isOver, children }) => {
  let className = 'clearfix column__header';
  if (canDrop) className += ' column__header--can-drop';
  if (isOver) className += ' column__header--is-over';

  return (
    <h2 className={className} onDoubleClick={onDoubleClick}>
      <span className="column__title"> {children} </span>
      <RemoveColumnButton onClick={onRemove} />
    </h2>
  );
};
