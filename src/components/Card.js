import React from 'react';
import { DragSource } from 'react-dnd';
import RemoveCardButton from './RemoveCardButton';
import ThumbsUpIcon from 'material-ui/svg-icons/action/thumb-up';
import ThumbsDownIcon from 'material-ui/svg-icons/action/thumb-down';
import EditIcon from 'material-ui/svg-icons/image/edit';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      name: props.name,
      parentId: props.parentId
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult) props.moveCard(item.parentId, dropResult.id, item.id);
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Card extends React.Component {
  state = {
    expanded: false,
    votes: 0
  };

  render() {
    return this.props.connectDragSource(
      <li key={this.props.key} id={this.props.id} className="card" >
        <div
          className="card__head"
          onClick={() => {
            this.setState({...this.state, expanded: !this.state.expanded})
          }}
        >
          <div>
            <span>{this.props.name}</span>
          </div>
          <div>
            <span
              className="card__votes"
              style={{ display: this.state.votes === 0 ? "none" : "inline-block"}}
            >
              { this.state.votes > 0 ? `+${this.state.votes}` : `${this.state.votes}` }
            </span>
          </div>
        </div>

        <div
          style={{ display: this.state.expanded ? "inline-flex" : "none" }}
          className="card__actions"
        >
          <span
            onClick={(e) => { this.setState({...this.state, votes: this.state.votes + 1 }) }}
          ><ThumbsUpIcon /></span>

          <span
            onClick={(e) => { this.setState({...this.state, votes: this.state.votes - 1 }) }}
          ><ThumbsDownIcon /></span>

          <span
            onClick={(e) => {
              this.props.editCard(
                this.props.parentId,
                this.props.id,
                this.props.name
              );
            }}
          ><EditIcon /></span>

          <RemoveCardButton
            removeCard={() => this.props.removeCard(this.props.parentId, this.props.id)}
          />
        </div>
      </li>
    );
  }
}
export default DragSource("Card", cardSource, collect)(Card);
