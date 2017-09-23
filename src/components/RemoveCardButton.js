import React, { Component } from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
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
      <span onClick={() => this.handleOpen()} >
        <DeleteIcon />
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
      </span>
    );
  }
}
