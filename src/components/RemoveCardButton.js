import React, { Component } from "react";
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { KeyboardShortcuts } from "./KeyboardShortcuts";

export default class RemoveCardButton extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleRemoveCard = () => {
    this.handleClose();
    this.props.removeCard();
  }

  render() {
    const actions = [
      <FlatButton
        label="No"
        primary={true}
        onTouchTap={() => this.handleClose() }
      />,
      <FlatButton
        label="Yes"
        primary={true}
        onTouchTap={() => this.handleRemoveCard() }
      />
    ];

    return (
      <div>
        <span
          className="card__close" 
          onClick={() => this.handleOpen()}
        >
          <CloseIcon className="card__close-icon" />
        </span>
        <Dialog
          title="Are you sure you want to delete this?"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <KeyboardShortcuts keys={{
            13: () => this.handleRemoveCard()
          }}/>
        </Dialog>
      </div>
    );
  }
}
