import React from 'react';
import Card from './Card';

class Column extends React.Component {
  render() {
    let cardItems = this.props.data.cards.map((card, i) => {
      return <Card key={i} name={card.name} />;
    });

    return (
      <div className="column">
        <h2>{this.props.data.name}</h2>
        <ul>{cardItems}</ul>
        <div className="add-card-placeholder">
          <a href="#">Add a card...</a>
        </div>
      </div>
    );
  }
};

export default Column;
