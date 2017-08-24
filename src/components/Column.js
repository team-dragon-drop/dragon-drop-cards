import React, { Component } from "react";
import { DropTarget } from 'react-dnd';
import Paper from 'material-ui/Paper';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import Card from './Card';
import AddCardButton from './AddCardButton';

let canDropYN = true;

const cardTarget = {
  drop(props) {
    return {
      id: props.id,
      name: props.name
    };
  },
  hover(props, monitor) {
    const item = monitor.getItem();
    canDropYN = (item.parentId === props.id) ? false : true;
    document.getElementById(item.id).style.display = canDropYN ? 'none' : 'block';
  },
  canDrop() {
    return canDropYN;
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class Column extends Component {
  cardItems() {
    const cardData = this.props.cards;
    return Object.keys(cardData).map(key => {
      return <Card
        key={key}
        name={cardData[key].name}
        id={key}
        parentId={this.props.id}
        editCard={this.props.editCard}
        removeCard={this.props.removeCard}
        moveCard={this.props.moveCard}
      />;
    });
  }

  renderPlaceholder() {
    return (
      <li style={{
        height:"40px",
        opacity: 0.5,
        backgroundColor: "grey",
      }} ></li>
    );
  }

  render() {
    return this.props.connectDropTarget(
      <div className="column">
        <Paper className="column-container">
          <h2 className="clearfix" onDoubleClick={() => {
            this.props.editColumn(this.props.id, this.props.name)
          }}>
            <span style={{ float: "left" }}>
              {this.props.name}
            </span>

            <span
              className="column__close"
              style={{ float: "right" }}
              onClick={() => this.props.removeColumn(this.props.id)}
            >
              <CloseIcon />
            </span>
          </h2>

          <ul className="column">
            {this.props.cards ? this.cardItems() : ""}
            {this.props.isOver && this.props.canDrop && this.renderPlaceholder()}
          </ul>

          <AddCardButton addCard={this.props.addCard}/>
        </Paper>
      </div>
    );
  }
};

export default DropTarget("Card", cardTarget, collect)(Column);
