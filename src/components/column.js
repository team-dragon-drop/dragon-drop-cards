import React from 'react';

const Column = (props) => {
  let cards = props.data.cards.map((card, i) => {
    return <li key={i}>{card.name}</li>;
  });

  return (
    <div className="column">
      <h2>{props.data.name}</h2>
      <ul>{cards}</ul>
      <div className="add-card-placeholder">
        <a href="#">Add a card...</a>
      </div>
    </div>
  );
};

export default Column;
