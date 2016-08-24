import React from 'react';

let Column = ({data}) => {
  let cardItems = data.cards.map((card, i) => {
    return <li key={i}>{card.name}</li>;
  });

  return (
    <div className="column">
      <h2>{data.name}</h2>
      <ul>{cardItems}</ul>
      <div className="add-card-placeholder">
        <a href="#">Add a card...</a>
      </div>
    </div>
  );
};

export default Column;
