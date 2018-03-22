import React, {Component} from 'react'
import {Droppable} from 'react-beautiful-dnd'
// import { DropTarget } from 'react-dnd';
import Paper from 'material-ui/Paper'
import Card from './Card'
import AddCardButton from './AddCardButton'
import RemoveColumnButton from './RemoveColumnButton'
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'

// let canDropYN = true

// const cardTarget = {
//   drop(props) {
//     return {
//       id: props.id,
//       name: props.name
//     };
//   },
//   hover(props, monitor) {
//     const item = monitor.getItem();
//     canDropYN = (item.parentId === props.id) ? false : true;
//     document.getElementById(item.id).style.display = canDropYN ? 'none' : 'block';
//   },
//   canDrop() {
//     return canDropYN;
//   },
// };

// function collect(connect, monitor) {
//   return {
//     connectDropTarget: connect.dropTarget(),
//     isOver: monitor.isOver(),
//     canDrop: monitor.canDrop()
//   };
// }

class Column extends Component {
  cardItems() {
    const cardData = this.props.cards
    return Object.keys(cardData).map((key, index) => {
      return (
        <Card
          key={key}
          index={index}
          name={cardData[key].name}
          votes={cardData[key].votes}
          id={key}
          parentId={this.props.id}
          editCard={this.props.editCard}
          removeCard={this.props.removeCard}
          moveCard={this.props.moveCard}
          voteUp={this.props.voteUpCard}
          voteDown={this.props.voteDownCard}
        />
      )
    })
  }

  renderPlaceholder() {
    return (
      <li
        style={{
          height: '40px',
          opacity: 0.5,
          backgroundColor: 'grey',
        }}
      />
    )
  }

  selectedIndicator() {
    if (this.props.selected) {
      return (
        <KeyboardArrowDown
          color="#fff"
          className="column__selected-indicator"
        />
      )
    }
  }

  render() {
    // return this.props.connectDropTarget(
    return (
      <Droppable droppableId={this.props.id} type="CARD">
        {(provided, snapshot) => (
          <div className="column">
            {this.selectedIndicator()}

            <Paper className="column-container">
              <h2
                className="clearfix"
                onDoubleClick={() => {
                  this.props.editColumn(this.props.id, this.props.name)
                }}
              >
                <span style={{float: 'left'}}>{this.props.name}</span>

                <RemoveColumnButton
                  removeColumn={() => this.props.removeColumn(this.props.id)}
                />
              </h2>

              <ul
                className="column__card-list"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {this.props.cards ? this.cardItems() : ''}
                {this.props.isOver &&
                  this.props.canDrop &&
                  this.renderPlaceholder()}
                {provided.placeholder}
              </ul>

              <AddCardButton
                keyboardShortcutsActive={this.props.selected}
                addCard={this.props.addCard}
              />
            </Paper>
          </div>
        )}
      </Droppable>
    )
    // );
  }
}

// export default DropTarget("Card", cardTarget, collect)(Column);
export default Column
